import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { USERS, MATCHES, POSTS, STORIES, FIELDS, NOTIFICATIONS } from '../lib/seedData'
import * as api from '../lib/supabaseApi'

const SUPABASE_READY = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
)

// ── AUTH STORE ──────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      loading: false,

      // Called once on app boot to restore session
      init: async () => {
        if (!SUPABASE_READY) return
        try {
          const session = await api.getSession()
          if (session?.user) {
            const profile = await api.getProfile(session.user.id)
            set({ user: { ...profile, email: session.user.email }, isLoggedIn: true })
          }
        } catch {}
      },

      login: async (email, password) => {
        if (!SUPABASE_READY) {
          // Demo fallback
          const found = USERS.find(u => u.username === email.split('@')[0]) || USERS[0]
          set({ user: { ...found, email }, isLoggedIn: true })
          return { success: true }
        }
        set({ loading: true })
        try {
          const { user: authUser } = await api.signIn(email, password)
          const profile = await api.getProfile(authUser.id)
          set({ user: { ...profile, email: authUser.email }, isLoggedIn: true, loading: false })
          return { success: true }
        } catch (err) {
          set({ loading: false })
          return { success: false, error: err.message || 'Error al iniciar sesión' }
        }
      },

      register: async (data) => {
        if (!SUPABASE_READY) {
          // Demo fallback
          const user = {
            id: 'u_' + Date.now(),
            name: data.name, username: data.email.split('@')[0],
            email: data.email, city: data.city || 'España',
            handicap: parseFloat(data.handicap) || 36, bio: data.bio || '',
            initials: data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
            color: 'from-brand-green to-brand-field',
          }
          set({ user, isLoggedIn: true })
          return { success: true }
        }
        set({ loading: true })
        try {
          await api.signUp(data.email, data.password, { name: data.name })
          // Sign in immediately after signup
          const { user: authUser } = await api.signIn(data.email, data.password)
          // Update profile with extra data
          const profile = await api.updateProfile(authUser.id, {
            name: data.name,
            city: data.city || 'España',
            bio: data.bio || '',
            handicap: parseFloat(data.handicap) || 36,
            initials: data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
            username: data.email.split('@')[0],
          })
          set({ user: { ...profile, email: authUser.email }, isLoggedIn: true, loading: false })
          return { success: true }
        } catch (err) {
          set({ loading: false })
          return { success: false, error: err.message || 'Error al registrarse' }
        }
      },

      updateProfile: async (updates) => {
        const { user } = get()
        if (!user) return
        if (SUPABASE_READY) {
          try {
            const profile = await api.updateProfile(user.id, updates)
            set({ user: { ...user, ...profile } })
          } catch {}
        } else {
          set({ user: { ...user, ...updates } })
        }
      },

      logout: async () => {
        if (SUPABASE_READY) await api.signOut()
        set({ user: null, isLoggedIn: false })
      },
    }),
    {
      name: 'ptt-auth',
      partialize: (s) => ({ user: s.user, isLoggedIn: s.isLoggedIn }),
    }
  )
)

// ── DATA STORE ──────────────────────────────────────────────
export const useDataStore = create(
  persist(
    (set, get) => ({
      matches: MATCHES,
      posts: POSTS,
      stories: STORIES,
      fields: FIELDS,
      users: USERS,
      notifications: NOTIFICATIONS,
      scorecards: [],
      likedPosts: [],
      toasts: [],
      dataLoaded: false,

      // Load all data from Supabase (call on app boot after auth)
      loadData: async () => {
        if (!SUPABASE_READY || get().dataLoaded) return
        try {
          const [fields, matches, posts] = await Promise.all([
            api.getFields(),
            api.getMatches(),
            api.getPosts(),
          ])
          set({ fields, matches, posts, dataLoaded: true })
        } catch (err) {
          console.warn('Supabase load failed, using seed data:', err.message)
        }
      },

      loadUserData: async (userId) => {
        if (!SUPABASE_READY) return
        try {
          const [scorecards, likedPostIds, notifications] = await Promise.all([
            api.getScorecards(userId),
            api.getLikedPosts(userId),
            api.getNotifications(userId),
          ])
          set({ scorecards, likedPosts: likedPostIds.map(id => `${id}_${userId}`), notifications })
        } catch (err) {
          console.warn('User data load failed:', err.message)
        }
      },

      // MATCHES
      createMatch: async (matchData) => {
        if (SUPABASE_READY) {
          try {
            const match = await api.createMatch(matchData)
            const normalized = {
              ...matchData, id: match.id, createdAt: match.created_at,
              playerIds: [matchData.creatorId],
            }
            set(s => ({ matches: [normalized, ...s.matches] }))
            return normalized
          } catch (err) {
            get().toast(err.message, 'error')
            throw err
          }
        }
        const match = { ...matchData, id: 'm_' + Date.now(), createdAt: new Date().toISOString() }
        set(s => ({ matches: [match, ...s.matches] }))
        return match
      },

      joinMatch: async (matchId, userId) => {
        if (SUPABASE_READY) {
          try { await api.joinMatch(matchId, userId) } catch {}
        }
        set(s => ({
          matches: s.matches.map(m =>
            m.id === matchId && !m.playerIds.includes(userId)
              ? { ...m, playerIds: [...m.playerIds, userId] } : m
          )
        }))
      },

      leaveMatch: async (matchId, userId) => {
        if (SUPABASE_READY) {
          try { await api.leaveMatch(matchId, userId) } catch {}
        }
        set(s => ({
          matches: s.matches.map(m =>
            m.id === matchId ? { ...m, playerIds: m.playerIds.filter(id => id !== userId) } : m
          )
        }))
      },

      getMatch: (id) => get().matches.find(m => m.id === id),

      // POSTS
      deletePost: async (postId) => {
        if (SUPABASE_READY) {
          try { await api.deletePost(postId) } catch (err) {
            get().toast(err.message, 'error'); return
          }
        }
        set(s => ({ posts: s.posts.filter(p => p.id !== postId) }))
      },

      patchPostComments: (postId, delta) => {
        set(s => ({ posts: s.posts.map(p => p.id === postId ? { ...p, comments: (p.comments || 0) + delta } : p) }))
      },

      refreshNotifications: async () => {
        const { user } = useAuthStore.getState()
        if (!SUPABASE_READY || !user) return
        try {
          const notifications = await api.getNotifications(user.id)
          set({ notifications })
        } catch {}
      },

      createPost: async (postData) => {
        if (SUPABASE_READY) {
          try {
            const p = await api.createPost(postData)
            const post = { id: p.id, userId: p.user_id, text: p.text, imageGradient: p.image_gradient, likes: 0, comments: 0, scorecard: p.scorecard, photos: p.photos || [], createdAt: p.created_at, author: useAuthStore.getState().user }
            set(s => ({ posts: [post, ...s.posts] }))
            return post
          } catch (err) {
            get().toast(err.message, 'error')
            throw err
          }
        }
        const post = { ...postData, id: 'p_' + Date.now(), likes: 0, comments: 0, createdAt: new Date().toISOString() }
        set(s => ({ posts: [post, ...s.posts] }))
        return post
      },

      toggleLike: async (postId, userId) => {
        const key = `${postId}_${userId}`
        const liked = get().likedPosts.includes(key)
        // Optimistic update
        set(s => ({
          likedPosts: liked ? s.likedPosts.filter(k => k !== key) : [...s.likedPosts, key],
          posts: s.posts.map(p => p.id === postId ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p)
        }))
        if (SUPABASE_READY) {
          try {
            if (liked) await api.unlikePost(postId, userId)
            else await api.likePost(postId, userId)
          } catch {}
        }
      },

      isLiked: (postId, userId) => get().likedPosts.includes(`${postId}_${userId}`),

      // SCORECARDS
      saveScorecard: async (data) => {
        if (SUPABASE_READY) {
          try {
            const sc = await api.saveScorecard(data)
            set(s => ({ scorecards: [sc, ...s.scorecards] }))
            return sc
          } catch (err) {
            get().toast(err.message, 'error')
            throw err
          }
        }
        const sc = { ...data, id: 'sc_' + Date.now(), createdAt: new Date().toISOString() }
        set(s => ({ scorecards: [sc, ...s.scorecards] }))
        return sc
      },

      // NOTIFICATIONS
      markAllRead: async () => {
        const { user } = useAuthStore.getState()
        if (SUPABASE_READY && user) {
          try { await api.markNotificationsRead(user.id) } catch {}
        }
        set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) }))
      },
      unreadCount: () => get().notifications.filter(n => !n.read).length,

      // LOOKUPS
      getUser: (id) => {
        const fromStore = get().users.find(u => u.id === id)
        if (fromStore) return fromStore
        // Also check auth user
        const authUser = useAuthStore.getState().user
        if (authUser?.id === id) return authUser
        return null
      },
      getField: (id) => get().fields.find(f => f.id === id),

      // TOASTS
      toast: (message, type = 'success') => {
        const id = Date.now()
        set(s => ({ toasts: [...s.toasts, { id, message, type }] }))
        setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 3500)
      },
      removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
    }),
    {
      name: 'ptt-data',
      partialize: (s) => ({
        matches: s.matches, posts: s.posts,
        scorecards: s.scorecards, likedPosts: s.likedPosts,
      }),
    }
  )
)

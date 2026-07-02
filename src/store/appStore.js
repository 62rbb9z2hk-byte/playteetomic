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
            municipality: data.municipality || null,
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
            municipality: data.municipality || null,
            bio: data.bio || '',
            handicap: parseFloat(data.handicap) || 36,
            initials: data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
            username: data.email.split('@')[0],
            rfeg_license: data.rfegLicense || null,
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
      messages: [],
      conversations: [],
      toasts: [],
      dataLoaded: false,

      // Load all data from Supabase (call on app boot after auth)
      loadData: async () => {
        if (!SUPABASE_READY) return
        const [fieldsR, matchesR, postsR] = await Promise.allSettled([
          api.getFields(), api.getMatches(), api.getPosts(),
        ])
        const update = { dataLoaded: true }
        if (fieldsR.status === 'fulfilled') {
          // Merge: if Supabase field has no holePhotos yet, fall back to seed data photos
          update.fields = fieldsR.value.map(f => ({
            ...f,
            holePhotos: f.holePhotos || FIELDS.find(s => s.name === f.name)?.holePhotos || null,
            holePars:   f.holePars   || FIELDS.find(s => s.name === f.name)?.holePars   || null,
          }))
        } else console.warn('getFields failed:', fieldsR.reason?.message)
        if (matchesR.status === 'fulfilled') update.matches = matchesR.value
        if (postsR.status === 'fulfilled') update.posts = postsR.value
        set(update)
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
      deleteScorecard: async (id) => {
        if (SUPABASE_READY) {
          try { await api.deleteScorecard(id) } catch (err) {
            get().toast(err.message, 'error'); return
          }
        }
        set(s => ({ scorecards: s.scorecards.filter(c => c.id !== id) }))
        get().toast('Scorecard eliminada')
      },

      updateScorecard: async (id, updates) => {
        if (SUPABASE_READY) {
          try {
            await api.updateScorecard(id, updates)
          } catch (err) {
            get().toast(err.message, 'error'); return
          }
        }
        set(s => ({ scorecards: s.scorecards.map(c => c.id === id ? { ...c, ...updates } : c) }))
        get().toast('Scorecard actualizada')
      },

      saveScorecard: async (data) => {
        if (SUPABASE_READY) {
          try {
            const raw = await api.saveScorecard(data)
            const sc = {
              id: raw.id, userId: raw.user_id, fieldId: raw.field_id,
              fieldName: raw.field_name, date: raw.date,
              scores: raw.scores, pars: raw.pars, gross: raw.gross,
              stableford: raw.stableford, createdAt: raw.created_at,
            }
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

      // MESSAGES
      sendMessage: async ({ fromId, toId, text }) => {
        const msg = { id: 'msg_' + Date.now(), fromId, toId, text, createdAt: new Date().toISOString(), read: false }
        if (SUPABASE_READY) {
          try {
            const saved = await api.sendMessage(fromId, toId, text)
            set(s => ({ messages: [...s.messages, saved] }))
            get()._buildConversations(fromId)
            return
          } catch (err) {
            console.warn('sendMessage failed:', err.message)
          }
        }
        set(s => ({ messages: [...s.messages, msg] }))
        get()._buildConversations(fromId)
      },

      loadMessages: async (userId, otherUserId) => {
        if (!SUPABASE_READY) return
        try {
          const msgs = await api.getMessages(userId, otherUserId)
          set(s => {
            const rest = s.messages.filter(m =>
              !((m.fromId === userId && m.toId === otherUserId) ||
                (m.fromId === otherUserId && m.toId === userId))
            )
            return { messages: [...rest, ...msgs] }
          })
        } catch (err) {
          console.warn('loadMessages failed:', err.message)
        }
      },

      loadConversations: async (userId) => {
        if (!SUPABASE_READY) { get()._buildConversations(userId); return }
        try {
          const convs = await api.getConversations(userId)
          set({ conversations: convs })
        } catch { get()._buildConversations(userId) }
      },

      _buildConversations: (userId) => {
        const { messages, users } = get()
        const map = {}
        messages.forEach(m => {
          if (m.fromId !== userId && m.toId !== userId) return
          const otherId = m.fromId === userId ? m.toId : m.fromId
          if (!map[otherId] || new Date(m.createdAt) > new Date(map[otherId].lastMessageAt)) {
            map[otherId] = {
              id: otherId,
              otherUser: users.find(u => u.id === otherId),
              lastMessage: m.text,
              lastMessageAt: m.createdAt,
              unread: 0,
            }
          }
          if (m.toId === userId && !m.read) map[otherId].unread = (map[otherId].unread || 0) + 1
        })
        set({ conversations: Object.values(map).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)) })
      },

      subscribeToMessages: (userId, callback) => {
        if (!SUPABASE_READY) return () => {}
        return api.subscribeToMessages(userId, (msg) => {
          set(s => ({ messages: [...s.messages.filter(m => m.id !== msg.id), msg] }))
          if (callback) callback(msg)
        })
      },

      unreadMessageCount: () => {
        const authUser = useAuthStore.getState().user
        if (!authUser) return 0
        return get().messages.filter(m => m.toId === authUser.id && !m.read).length
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
        fields: s.fields,
        matches: s.matches, posts: s.posts,
        scorecards: s.scorecards, likedPosts: s.likedPosts,
        messages: s.messages,
      }),
    }
  )
)

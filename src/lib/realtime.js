import { supabase } from './supabase'
import { useDataStore } from '../store/appStore'

let matchChannel = null
let postChannel = null

export function subscribeToMatches() {
  if (matchChannel) return
  matchChannel = supabase
    .channel('matches-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'match_players' }, (payload) => {
      const store = useDataStore.getState()
      if (payload.eventType === 'INSERT') {
        store.joinMatch(payload.new.match_id, payload.new.user_id)
      } else if (payload.eventType === 'DELETE') {
        store.leaveMatch(payload.old.match_id, payload.old.user_id)
      }
    })
    .subscribe()
}

export function subscribeToPosts() {
  if (postChannel) return
  postChannel = supabase
    .channel('posts-realtime')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, async (payload) => {
      const store = useDataStore.getState()
      const exists = store.posts.find(p => p.id === payload.new.id)
      if (!exists) {
        const newPost = {
          id: payload.new.id,
          userId: payload.new.user_id,
          text: payload.new.text,
          imageGradient: payload.new.image_gradient,
          likes: 0, comments: 0,
          scorecard: payload.new.scorecard,
          createdAt: payload.new.created_at,
        }
        useDataStore.setState(s => ({ posts: [newPost, ...s.posts] }))
      }
    })
    .subscribe()
}

export function unsubscribeAll() {
  if (matchChannel) { supabase.removeChannel(matchChannel); matchChannel = null }
  if (postChannel) { supabase.removeChannel(postChannel); postChannel = null }
}

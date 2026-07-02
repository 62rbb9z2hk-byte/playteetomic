import { supabase } from './supabase'

// ── AUTH ────────────────────────────────────────────────────

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email, password, meta) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: meta }
  })
  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

// ── PROFILES ────────────────────────────────────────────────

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles').update(updates).eq('id', userId).select().single()
  if (error) throw error
  return data
}

export async function getUsers() {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data
}

// ── FIELDS ──────────────────────────────────────────────────

export async function getFields() {
  const { data, error } = await supabase.from('fields').select('*').order('name')
  if (error) throw error
  // normalize snake_case → camelCase for components
  return data.map(normalizeField)
}

function normalizeField(f) {
  return {
    id: f.id, name: f.name, location: f.location,
    holes: f.holes, par: f.par,
    courseRating: f.course_rating, slope: f.slope,
    rating: f.rating, gradient: f.gradient, isPartner: f.is_partner,
    holePars: f.hole_pars || null,
    holePhotos: f.hole_photos || null,
  }
}

// ── MATCHES ─────────────────────────────────────────────────

export async function getMatches() {
  const { data, error } = await supabase
    .from('matches')
    .select(`*, match_players(user_id), fields(name, location, gradient)`)
    .order('date', { ascending: true })
  if (error) throw error
  return data.map(normalizeMatch)
}

export async function createMatch(matchData) {
  const { data, error } = await supabase
    .from('matches').insert({
      field_id: matchData.fieldId,
      creator_id: matchData.creatorId,
      date: matchData.date,
      tee_time: matchData.teeTime || null,
      holes: matchData.holes,
      max_players: matchData.maxPlayers,
      hcp_min: matchData.hcpMin,
      hcp_max: matchData.hcpMax,
      type: matchData.type,
      description: matchData.description,
    }).select().single()
  if (error) throw error
  // auto-join creator
  await supabase.from('match_players').insert({ match_id: data.id, user_id: matchData.creatorId })
  return data
}

export async function joinMatch(matchId, userId) {
  const { error } = await supabase.from('match_players').insert({ match_id: matchId, user_id: userId })
  if (error) throw error
}

export async function leaveMatch(matchId, userId) {
  const { error } = await supabase.from('match_players').delete()
    .eq('match_id', matchId).eq('user_id', userId)
  if (error) throw error
}

function normalizeMatch(m) {
  return {
    id: m.id,
    fieldId: m.field_id,
    creatorId: m.creator_id,
    date: m.date,
    teeTime: m.tee_time,
    holes: m.holes,
    maxPlayers: m.max_players,
    hcpMin: m.hcp_min,
    hcpMax: m.hcp_max,
    type: m.type,
    description: m.description,
    createdAt: m.created_at,
    playerIds: (m.match_players || []).map(p => p.user_id),
    field: m.fields || null,
  }
}

// ── POSTS ───────────────────────────────────────────────────

export async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId)
  if (error) throw error
}

export async function getComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(name, initials, color)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data.map(c => ({
    id: c.id, postId: c.post_id, userId: c.user_id,
    text: c.text, createdAt: c.created_at, author: c.profiles,
  }))
}

export async function createComment(postId, userId, text) {
  const { data, error } = await supabase
    .from('comments').insert({ post_id: postId, user_id: userId, text }).select().single()
  if (error) throw error
  return data
}

export async function deleteComment(commentId) {
  const { error } = await supabase.from('comments').delete().eq('id', commentId)
  if (error) throw error
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts').select('*, profiles(name, initials, color)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(p => ({
    id: p.id, userId: p.user_id, text: p.text,
    imageGradient: p.image_gradient, likes: p.likes, comments: p.comments,
    scorecard: p.scorecard, photos: p.photos || [], createdAt: p.created_at,
    author: p.profiles,
  }))
}

export async function createPost(postData) {
  const { data, error } = await supabase
    .from('posts').insert({
      user_id: postData.userId,
      text: postData.text,
      image_gradient: postData.imageGradient,
      scorecard: postData.scorecard || null,
      photos: postData.photos || [],
    }).select().single()
  if (error) throw error
  return data
}

export async function likePost(postId, userId) {
  const { error } = await supabase.from('post_likes').insert({ post_id: postId, user_id: userId })
  if (error && error.code !== '23505') throw error // ignore duplicate
}

export async function unlikePost(postId, userId) {
  const { error } = await supabase.from('post_likes').delete()
    .eq('post_id', postId).eq('user_id', userId)
  if (error) throw error
}

export async function getLikedPosts(userId) {
  const { data, error } = await supabase.from('post_likes').select('post_id').eq('user_id', userId)
  if (error) throw error
  return data.map(r => r.post_id)
}

// ── SCORECARDS ───────────────────────────────────────────────

export async function saveScorecard(sc) {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sc.fieldId || '')
  const { data, error } = await supabase.from('scorecards').insert({
    user_id: sc.userId,
    field_id: isUUID ? sc.fieldId : null,
    field_name: sc.fieldName,
    date: sc.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    scores: (sc.scores || []).map(s => (s === null || s === undefined) ? 0 : Number(s)),
    pars: sc.pars || [],
    gross: sc.gross || 0,
    stableford: sc.stableford || 0,
  }).select().single()
  if (error) throw error
  return data
}

export async function deleteScorecard(id) {
  const { error } = await supabase.from('scorecards').delete().eq('id', id)
  if (error) throw error
}

export async function updateScorecard(id, updates) {
  const { data, error } = await supabase.from('scorecards')
    .update({
      scores: (updates.scores || []).map(s => (s === null || s === undefined) ? 0 : Number(s)),
      gross: updates.gross || 0,
      stableford: updates.stableford || 0,
    })
    .eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function getScorecards(userId) {
  const { data, error } = await supabase.from('scorecards')
    .select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error
  return data.map(normalizeScorecard)
}

function normalizeScorecard(sc) {
  return {
    id: sc.id, userId: sc.user_id, fieldId: sc.field_id,
    fieldName: sc.field_name, date: sc.date,
    scores: sc.scores, pars: sc.pars, gross: sc.gross,
    stableford: sc.stableford, createdAt: sc.created_at,
  }
}

// ── NOTIFICATIONS ────────────────────────────────────────────

export async function getNotifications(userId) {
  const { data, error } = await supabase.from('notifications')
    .select('*, profiles!from_user_id(name, initials, color)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(n => ({
    id: n.id, type: n.type, message: n.message,
    read: n.read, createdAt: n.created_at,
    fromUserId: n.from_user_id, fromUser: n.profiles,
  }))
}

export async function markNotificationsRead(userId) {
  const { error } = await supabase.from('notifications')
    .update({ read: true }).eq('user_id', userId)
  if (error) throw error
}

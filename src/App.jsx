import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore, useDataStore } from './store/appStore'
import { subscribeToMatches, subscribeToPosts, unsubscribeAll } from './lib/realtime'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Feed from './pages/app/Feed'
import Matches from './pages/app/Matches'
import CreateMatch from './pages/app/CreateMatch'
import MatchDetail from './pages/app/MatchDetail'
import Fields from './pages/app/Fields'
import FieldDetail from './pages/app/FieldDetail'
import Scorecard from './pages/app/Scorecard'
import MyProfile from './pages/app/MyProfile'
import Notifications from './pages/app/Notifications'
import CreatePost from './pages/app/CreatePost'

function AppInit() {
  const { init, user } = useAuthStore()
  const { loadData, loadUserData } = useDataStore()

  useEffect(() => {
    init()
    loadData()
    subscribeToMatches()
    subscribeToPosts()
    return () => unsubscribeAll()
  }, [])

  useEffect(() => {
    if (user?.id) loadUserData(user.id)
  }, [user?.id])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInit />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* App shell */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/feed" replace />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/nuevo" element={<CreatePost />} />
          <Route path="partidas" element={<Matches />} />
          <Route path="partidas/nueva" element={<CreateMatch />} />
          <Route path="partidas/:id" element={<MatchDetail />} />
          <Route path="campos" element={<Fields />} />
          <Route path="campos/:id" element={<FieldDetail />} />
          <Route path="scorecard" element={<Scorecard />} />
          <Route path="perfil" element={<MyProfile />} />
          <Route path="notificaciones" element={<Notifications />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

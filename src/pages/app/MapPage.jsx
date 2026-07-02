import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, MapPin, Users, X, Star } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { getMunicipalityCoords } from '../../lib/municipalities'
import HandicapBadge from '../../components/ui/HandicapBadge'
import Avatar from '../../components/ui/Avatar'

export default function MapPage() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])
  const { user } = useAuthStore()
  const { users } = useDataStore()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [nearby, setNearby] = useState([])
  const [mapReady, setMapReady] = useState(false)

  const playersWithCoords = users
    .filter(u => u.id !== user?.id)
    .map(u => ({
      ...u,
      coords: getMunicipalityCoords(u.municipality, u.city),
    }))
    .filter(u => u.coords)

  useEffect(() => {
    let active = true

    const loadLeaflet = async () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      if (!window.L) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          s.onload = res
          s.onerror = rej
          document.head.appendChild(s)
        })
      }

      if (!active || !mapRef.current || mapInstance.current) return

      const L = window.L
      const map = L.map(mapRef.current, {
        center: [40.2, -3.5],
        zoom: 6,
        zoomControl: true,
      })
      mapInstance.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 18,
      }).addTo(map)

      // My marker
      const meCoords = user && getMunicipalityCoords(user.municipality, user.city)
      if (meCoords) {
        const meIcon = L.divIcon({
          className: '',
          html: `<div style="width:36px;height:36px;border-radius:50%;background:#c9a84c;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#0a1a0a;box-shadow:0 2px 8px rgba(0,0,0,.6)">${user.initials || '??'}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        })
        L.marker([meCoords.lat, meCoords.lng], { icon: meIcon })
          .addTo(map)
          .bindPopup(`<b style="color:#c9a84c">Tú</b>`)
      }

      // Other players
      playersWithCoords.forEach(p => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:32px;height:32px;border-radius:50%;background:#1e3a22;border:2px solid #2a5030;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#c9a84c;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.5)">${p.initials}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })
        const marker = L.marker([p.coords.lat, p.coords.lng], { icon })
          .addTo(map)
          .on('click', () => {
            setSelected(p)
            // show nearby (within ~50km)
            const near = playersWithCoords.filter(other => {
              if (other.id === p.id || !other.coords) return false
              const d = Math.sqrt(
                Math.pow((other.coords.lat - p.coords.lat) * 111, 2) +
                Math.pow((other.coords.lng - p.coords.lng) * 80, 2)
              )
              return d < 50
            })
            setNearby(near)
          })
        markersRef.current.push(marker)
      })

      setMapReady(true)
    }

    loadLeaflet()

    return () => {
      active = false
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
        markersRef.current = []
      }
    }
  }, [])

  const handleMessage = (toUser) => {
    navigate(`/app/mensajes/${toUser.id}`, { state: { toUser } })
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-screen overflow-hidden">
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center gap-3 pointer-events-none">
        <div className="bg-brand-black/85 backdrop-blur border border-brand-deep rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
          <Users className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-semibold text-brand-cream">
            {playersWithCoords.length} golfistas en el mapa
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-4 z-10 bg-brand-black/85 backdrop-blur border border-brand-deep rounded-xl px-3 py-2 flex flex-col gap-1.5 text-xs text-brand-muted">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-brand-gold border-2 border-white flex-shrink-0" />
          <span>Tú</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1e3a22] border-2 border-[#2a5030] flex-shrink-0" />
          <span>Otros golfistas</span>
        </div>
      </div>

      {/* Selected player panel */}
      {selected && (
        <div className="absolute bottom-6 right-4 left-4 md:left-auto md:w-80 z-20">
          <div className="bg-brand-black/95 backdrop-blur border border-brand-deep rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar user={selected} size={12} />
                <div>
                  <p className="font-serif font-bold text-brand-cream">{selected.name}</p>
                  <p className="text-xs text-brand-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selected.municipality || selected.city}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <HandicapBadge hcp={selected.handicap} />
                    <span className="text-xs text-brand-muted">{selected.rounds} rondas</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-brand-muted hover:text-brand-cream p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bio */}
            {selected.bio && (
              <p className="text-xs text-brand-muted px-4 pb-3 leading-relaxed line-clamp-2">{selected.bio}</p>
            )}

            {/* Tags */}
            {selected.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {selected.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-brand-deep text-brand-muted px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 px-4 pb-3">
              {[1,2,3,4,5].map(n => (
                <Star key={n} className={`w-3.5 h-3.5 ${n <= Math.round(selected.rating || 4.5) ? 'fill-brand-gold text-brand-gold' : 'text-brand-deep'}`} />
              ))}
              <span className="text-xs text-brand-muted ml-1">{(selected.rating || 4.5).toFixed(1)}</span>
            </div>

            {/* Action */}
            <div className="px-4 pb-4">
              <button
                onClick={() => handleMessage(selected)}
                className="w-full btn-gold flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar mensaje
              </button>
            </div>

            {/* Nearby */}
            {nearby.length > 0 && (
              <div className="border-t border-brand-deep px-4 py-3">
                <p className="text-xs text-brand-muted mb-2 font-semibold">Cerca de aquí también está:</p>
                <div className="flex gap-2 flex-wrap">
                  {nearby.slice(0, 4).map(p => (
                    <button key={p.id} onClick={() => { setSelected(p); setNearby([]) }}
                      className="flex items-center gap-1.5 bg-brand-deep rounded-lg px-2 py-1 hover:border-brand-gold/30 transition-all">
                      <Avatar user={p} size={5} />
                      <span className="text-xs text-brand-cream">{p.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!mapReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-brand-black">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-brand-muted text-sm">Cargando mapa...</p>
          </div>
        </div>
      )}
    </div>
  )
}

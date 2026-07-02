import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import ToastContainer from '../ui/Toast'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen text-brand-cream relative overflow-hidden">
      {/* ── Golf course aerial background ─────────────────────── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0" aria-hidden>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-[0.28]">
          <defs>
            <radialGradient id="greenSheen" cx="38%" cy="38%" r="55%">
              <stop offset="0%" stopColor="#30b840" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="bgEdge" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="transparent" stopOpacity="0"/>
              <stop offset="100%" stopColor="#030b05" stopOpacity="0.55"/>
            </radialGradient>
            <linearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f0d050"/>
              <stop offset="100%" stopColor="#c89820"/>
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d2820"/>
              <stop offset="100%" stopColor="#071410"/>
            </linearGradient>
          </defs>

          {/* ── BASE ROUGH ── */}
          <rect width="1440" height="900" fill="#0c1e10"/>

          {/* ── TREE LINE (top edge, full width) ── */}
          <path d="M0,195 Q28,108 58,152 Q82,88 115,135 Q142,72 178,122 Q208,62 248,110 Q278,55 315,102 Q348,50 388,96 Q420,44 460,90 Q495,46 535,88 Q570,42 610,86 Q648,46 688,88 Q728,42 768,86 Q808,48 848,88 Q888,44 928,86 Q968,48 1008,86 Q1048,44 1088,86 Q1128,48 1168,86 Q1208,44 1248,86 Q1288,48 1328,86 Q1368,50 1408,86 L1440,88 L1440,195 L0,195 Z" fill="#060e08"/>
          <path d="M0,195 Q40,135 85,168 Q145,115 210,158 Q275,112 340,155 Q405,116 470,156 Q535,115 600,155 Q665,116 730,155 Q795,116 860,155 Q925,118 990,155 Q1055,116 1120,155 Q1185,116 1250,155 Q1315,118 1380,155 L1440,150 L1440,195 L0,195 Z" fill="#08140a"/>

          {/* ── FAIRWAY (sweeping curve, bottom-left → upper-right) ── */}
          <path d="M480,910 Q530,748 598,625 Q666,502 762,418 Q846,344 950,296 Q1020,265 1095,250"
            stroke="#1a6022" strokeWidth="240" strokeLinecap="round" fill="none"/>
          <path d="M480,910 Q530,748 598,625 Q666,502 762,418 Q846,344 950,296 Q1020,265 1095,250"
            stroke="#1e6e28" strokeWidth="140" strokeLinecap="round" fill="none"/>
          <path d="M480,910 Q530,748 598,625 Q666,502 762,418 Q846,344 950,296 Q1020,265 1095,250"
            stroke="#22782c" strokeWidth="55" strokeLinecap="round" fill="none" opacity="0.65"/>

          {/* ── WATER HAZARD (left) ── */}
          <ellipse cx="205" cy="610" rx="215" ry="140" fill="url(#waterGrad)" opacity="0.8"/>
          <ellipse cx="202" cy="607" rx="188" ry="118" fill="#081c14" opacity="0.5"/>
          <line x1="118" y1="580" x2="292" y2="587" stroke="#163428" strokeWidth="3" opacity="0.45" strokeLinecap="round"/>
          <line x1="100" y1="604" x2="305" y2="612" stroke="#163428" strokeWidth="3" opacity="0.38" strokeLinecap="round"/>
          <line x1="122" y1="628" x2="288" y2="636" stroke="#163428" strokeWidth="2.5" opacity="0.3" strokeLinecap="round"/>
          {/* Water edge ripple */}
          <ellipse cx="205" cy="610" rx="215" ry="140" fill="none" stroke="#1a4030" strokeWidth="3" opacity="0.25"/>

          {/* ── PUTTING GREEN ── */}
          {/* Apron / fringe */}
          <ellipse cx="1152" cy="250" rx="208" ry="126" fill="#228c30" opacity="0.85"/>
          {/* Green surface */}
          <ellipse cx="1148" cy="246" rx="180" ry="108" fill="#28a838"/>
          {/* Sheen / highlight */}
          <ellipse cx="1148" cy="246" rx="180" ry="108" fill="url(#greenSheen)"/>
          {/* Fringe stroke */}
          <ellipse cx="1148" cy="246" rx="180" ry="108" fill="none" stroke="#1e9030" strokeWidth="4" opacity="0.4"/>

          {/* ── BUNKERS ── */}
          {/* Left bunker */}
          <ellipse cx="968" cy="298" rx="92" ry="52" fill="#ddb82a" opacity="0.72"/>
          <ellipse cx="964" cy="293" rx="72" ry="38" fill="#eec835" opacity="0.48"/>
          {/* Right bunker */}
          <ellipse cx="1330" cy="278" rx="72" ry="44" fill="#ddb82a" opacity="0.68"/>
          <ellipse cx="1326" cy="273" rx="55" ry="32" fill="#eec835" opacity="0.44"/>
          {/* Rear bunker */}
          <ellipse cx="1140" cy="135" rx="64" ry="36" fill="#ddb82a" opacity="0.62"/>
          <ellipse cx="1136" cy="130" rx="48" ry="26" fill="#eec835" opacity="0.4"/>
          {/* Small far-right bunker */}
          <ellipse cx="1418" cy="350" rx="44" ry="26" fill="#d4ae22" opacity="0.52"/>

          {/* ── FLAG & PIN ── */}
          {/* Pole shadow */}
          <line x1="1162" y1="246" x2="1238" y2="263" stroke="#030a04" strokeWidth="3" opacity="0.45" strokeLinecap="round"/>
          {/* Pole */}
          <line x1="1162" y1="52" x2="1162" y2="246" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round"/>
          {/* Flag cloth */}
          <polygon points="1162,52 1238,77 1162,104" fill="url(#flagGrad)"/>
          {/* Flag shading */}
          <polygon points="1162,52 1238,77 1162,77" fill="#fff8c0" opacity="0.14"/>
          {/* Pole ball finial */}
          <circle cx="1162" cy="52" r="5" fill="#e0c040"/>

          {/* ── HOLE (cup) ── */}
          <circle cx="1165" cy="246" r="13" fill="#020706"/>
          <ellipse cx="1168" cy="249" rx="13" ry="6" fill="#020706" opacity="0.45"/>

          {/* ── AMBIENT / VIGNETTE ── */}
          <rect width="1440" height="900" fill="url(#bgEdge)"/>
        </svg>
      </div>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      </div>

      {/* Main content */}
      <main className={`transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-60'} pb-20 md:pb-0 min-h-screen safe-top`}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
}

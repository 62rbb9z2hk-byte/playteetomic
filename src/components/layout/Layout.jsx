import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import ToastContainer from '../ui/Toast'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen text-brand-cream relative overflow-hidden">
      {/* Golf course background decoration */}
      <div className="fixed bottom-0 right-0 w-[520px] h-[420px] pointer-events-none select-none z-0 opacity-[0.055]" aria-hidden>
        <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
          {/* Sky / trees silhouette */}
          <rect width="520" height="200" fill="#0e3018"/>
          {/* Tree line */}
          <path d="M0,200 Q30,140 60,170 Q90,120 120,160 Q150,100 180,155 Q210,110 240,150 Q270,95 300,148 Q330,118 360,158 Q390,108 420,152 Q450,125 480,155 Q500,140 520,160 L520,200 Z" fill="#0a2410"/>
          {/* Fairway */}
          <ellipse cx="280" cy="340" rx="350" ry="110" fill="#16491e"/>
          {/* Rough edges */}
          <ellipse cx="280" cy="340" rx="370" ry="125" fill="none" stroke="#1a5422" strokeWidth="4"/>
          {/* The green */}
          <ellipse cx="290" cy="355" rx="130" ry="58" fill="#1e6428"/>
          {/* Fringe */}
          <ellipse cx="290" cy="355" rx="148" ry="68" fill="none" stroke="#226e2c" strokeWidth="3"/>
          {/* Bunker left */}
          <ellipse cx="148" cy="345" rx="52" ry="24" fill="#b8984a" opacity="0.6"/>
          {/* Bunker right */}
          <ellipse cx="438" cy="350" rx="40" ry="18" fill="#b8984a" opacity="0.5"/>
          {/* Pin shadow */}
          <ellipse cx="296" cy="357" rx="10" ry="4" fill="#0a2410" opacity="0.5"/>
          {/* Flag pole */}
          <line x1="290" y1="210" x2="290" y2="357" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Flag */}
          <polygon points="290,210 336,228 290,246" fill="#c9a84c"/>
          {/* Golf hole */}
          <circle cx="290" cy="357" r="8" fill="#050f08"/>
          {/* Subtle glow around green */}
          <ellipse cx="290" cy="355" rx="100" ry="45" fill="none" stroke="#2a8034" strokeWidth="1" opacity="0.4"/>
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

export default function Avatar({ user, size = 10, className = '' }) {
  const sz = `w-${size} h-${size}`
  if (!user) return <div className={`${sz} rounded-full bg-brand-deep ${className}`} />
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${user.color || 'from-brand-green to-brand-field'} flex items-center justify-center font-bold text-brand-black flex-shrink-0 ${className}`}
      style={{ fontSize: size > 12 ? '1.1rem' : '0.8rem' }}>
      {user.initials}
    </div>
  )
}

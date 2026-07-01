export const FIELDS = [
  { id: 'f1', name: 'Real Club de Golf de Sevilla', location: 'Sevilla, Andalucía', holes: 18, par: 72, courseRating: 73.5, slope: 135, rating: 4.9, isPartner: true, gradient: 'from-amber-900 via-green-800 to-green-600' },
  { id: 'f2', name: 'Club de Golf Costa del Sol', location: 'Málaga, Andalucía', holes: 18, par: 72, courseRating: 72.1, slope: 128, rating: 4.8, isPartner: true, gradient: 'from-teal-900 via-green-700 to-cyan-600' },
  { id: 'f3', name: 'Real Club de Golf El Prat', location: 'Barcelona, Cataluña', holes: 18, par: 72, courseRating: 74.2, slope: 141, rating: 4.7, isPartner: true, gradient: 'from-indigo-900 via-blue-800 to-green-700' },
  { id: 'f4', name: 'Club de Golf La Moraleja', location: 'Madrid', holes: 18, par: 72, courseRating: 73.8, slope: 137, rating: 4.9, isPartner: true, gradient: 'from-red-900 via-amber-800 to-green-700' },
  { id: 'f5', name: 'Real Club de Golf Las Palmas', location: 'Las Palmas, Canarias', holes: 18, par: 71, courseRating: 70.5, slope: 124, rating: 4.6, isPartner: true, gradient: 'from-gray-900 via-green-900 to-green-600' },
  { id: 'f6', name: 'Club de Golf Neguri', location: 'Bilbao, País Vasco', holes: 18, par: 70, courseRating: 69.8, slope: 122, rating: 4.5, isPartner: false, gradient: 'from-slate-800 via-green-800 to-green-500' },
  { id: 'f7', name: 'Club de Golf Valderrama', location: 'Sotogrande, Andalucía', holes: 18, par: 71, courseRating: 75.7, slope: 147, rating: 5.0, isPartner: true, gradient: 'from-green-950 via-green-800 to-emerald-600' },
  { id: 'f8', name: 'Real Club de Golf de Pedreña', location: 'Pedreña, Cantabria', holes: 18, par: 71, courseRating: 71.2, slope: 130, rating: 4.8, isPartner: true, gradient: 'from-slate-900 via-teal-800 to-green-600' },
]

export const USERS = [
  { id: 'u1', name: 'Carlos Martínez', username: 'carlosgolfer', city: 'Sevilla', handicap: 12, bio: 'Golfista apasionado desde hace 10 años. Madrugador empedernido.', initials: 'CM', color: 'from-emerald-500 to-green-700', rounds: 47, fields: 8, rating: 4.8, tags: ['madrugador', 'social', '18 hoyos'] },
  { id: 'u2', name: 'Laura García', username: 'lauragolf', city: 'Madrid', handicap: 24, bio: 'Nueva en Madrid, buscando grupo fijo para los domingos.', initials: 'LG', color: 'from-amber-500 to-yellow-700', rounds: 23, fields: 5, rating: 4.9, tags: ['social', 'quincenal', 'principiante'] },
  { id: 'u3', name: 'Javier Fernández', username: 'javi_pro', city: 'Barcelona', handicap: 3, bio: 'Scratch aspirante. Compito en torneos regionales.', initials: 'JF', color: 'from-blue-500 to-indigo-700', rounds: 92, fields: 14, rating: 4.7, tags: ['competitivo', 'scratch', '18 hoyos'] },
  { id: 'u4', name: 'Marta Ruiz', username: 'marta_golf', city: 'Málaga', handicap: 18, bio: 'Juego los fines de semana con cualquier nivel. Social ante todo.', initials: 'MR', color: 'from-rose-500 to-red-700', rounds: 31, fields: 6, rating: 5.0, tags: ['social', 'relajada', '9 y 18'] },
  { id: 'u5', name: 'Andrés Sánchez', username: 'andres_tee', city: 'Sevilla', handicap: 7, bio: 'Colecciono campos. 34 en el ranking y subiendo.', initials: 'AS', color: 'from-purple-500 to-violet-700', rounds: 68, fields: 22, rating: 4.6, tags: ['competitivo', 'viajero'] },
  { id: 'u6', name: 'Elena Torres', username: 'elena_t', city: 'Valencia', handicap: 31, bio: 'Empecé hace 2 años. Me encanta el ambiente del campo.', initials: 'ET', color: 'from-orange-500 to-amber-700', rounds: 14, fields: 3, rating: 4.8, tags: ['principiante', 'social', 'madrugadora'] },
  { id: 'u7', name: 'Pedro Gómez', username: 'pedro_golf', city: 'Bilbao', handicap: 15, bio: 'Fin de semana siempre al campo. Cañas post-ronda obligatorias.', initials: 'PG', color: 'from-teal-500 to-cyan-700', rounds: 55, fields: 9, rating: 4.5, tags: ['social', 'cañas', 'fin de semana'] },
  { id: 'u8', name: 'Sofía Morales', username: 'sofia_golfista', city: 'Madrid', handicap: 22, bio: 'Organizo torneos benéficos. El golf une personas.', initials: 'SM', color: 'from-pink-500 to-rose-700', rounds: 39, fields: 11, rating: 4.9, tags: ['organizadora', 'torneos', 'social'] },
  { id: 'u9', name: 'Ricardo Blanco', username: 'ricardob', city: 'Sotogrande', handicap: 1, bio: 'Vivo en el campo. Director en Valderrama los fines de semana.', initials: 'RB', color: 'from-green-400 to-emerald-700', rounds: 180, fields: 30, rating: 4.7, tags: ['scratch', 'competitivo', 'torneo'] },
  { id: 'u10', name: 'Isabel Navarro', username: 'isa_golf', city: 'Cantabria', handicap: 28, bio: 'Las vistas del campo de Pedreña no tienen precio.', initials: 'IN', color: 'from-sky-500 to-blue-700', rounds: 18, fields: 4, rating: 4.8, tags: ['social', 'relajada', 'madrugadora'] },
]

const today = new Date()
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().split('T')[0] }

export const MATCHES = [
  {
    id: 'm1', fieldId: 'f7', creatorId: 'u3', date: addDays(today, 2), teeTime: '07:30',
    holes: 18, maxPlayers: 4, hcpMin: 0, hcpMax: 15, type: 'competitive',
    description: 'Partida seria en Valderrama. Buscamos scratch o low hándicap para completar grupo.', playerIds: ['u3', 'u9'],
  },
  {
    id: 'm2', fieldId: 'f4', creatorId: 'u8', date: addDays(today, 3), teeTime: '09:00',
    holes: 18, maxPlayers: 4, hcpMin: 10, hcpMax: 36, type: 'social',
    description: 'Salida relajada en La Moraleja. Cañas en el bar del club al terminar.', playerIds: ['u8', 'u2', 'u6'],
  },
  {
    id: 'm3', fieldId: 'f1', creatorId: 'u1', date: addDays(today, 4), teeTime: '06:45',
    holes: 18, maxPlayers: 4, hcpMin: 5, hcpMax: 25, type: 'social',
    description: 'Madrugamos para coger el mejor horario en Sevilla.', playerIds: ['u1', 'u5'],
  },
  {
    id: 'm4', fieldId: 'f2', creatorId: 'u4', date: addDays(today, 5), teeTime: '11:00',
    holes: 9, maxPlayers: 3, hcpMin: 15, hcpMax: 54, type: 'social',
    description: 'Solo 9 hoyos rápidos. Nivel medio-alto principiante bienvenido.', playerIds: ['u4'],
  },
  {
    id: 'm5', fieldId: 'f3', creatorId: 'u7', date: addDays(today, 7), teeTime: '08:15',
    holes: 18, maxPlayers: 4, hcpMin: 0, hcpMax: 36, type: 'open',
    description: 'Partida abierta a todo nivel. El Prat es un campo espectacular.', playerIds: ['u7'],
  },
  {
    id: 'm6', fieldId: 'f8', creatorId: 'u10', date: addDays(today, 8), teeTime: '10:30',
    holes: 18, maxPlayers: 4, hcpMin: 20, hcpMax: 54, type: 'social',
    description: 'Las vistas de Pedreña son únicas. Nivel alto principiante.', playerIds: ['u10', 'u6'],
  },
]

export const POSTS = [
  {
    id: 'p1', userId: 'u1',
    text: '🌅 Amanecer en Valderrama. Hay campos que no necesitan palabras. Eagle en el hoyo 3 para arrancar el día con todo.',
    imageGradient: 'from-orange-900 via-green-900 to-green-700', likes: 47, comments: 12,
    scorecard: { total: 71, field: 'Valderrama', date: '28 jun', scores: [4,3,5,4,4,3,5,4,4], pars: [4,3,5,4,4,3,5,4,4] },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'p2', userId: 'u3',
    text: 'Nueva marca personal en El Prat. 68 golpes con hándicap 3. El swing está fluyendo este mes. 🏆',
    imageGradient: 'from-blue-900 via-indigo-800 to-green-700', likes: 89, comments: 23,
    scorecard: { total: 68, field: 'El Prat', date: '27 jun', scores: [3,3,4,4,3,3,4,3,5], pars: [4,3,5,4,4,3,5,4,4] },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'p3', userId: 'u8',
    text: 'Torneo benéfico recaudado: 4.200€ para la Asociación de Parkinson de Madrid. El golf une y el golf ayuda. ❤️⛳',
    imageGradient: 'from-rose-900 via-pink-800 to-green-700', likes: 134, comments: 41,
    scorecard: null,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: 'p4', userId: 'u2',
    text: 'Primer hoyo en uno de mi vida. Hoyo 7, par 3, 148m. Todavía no me lo creo. 🎯⛳ Gracias al grupo de PLAY TEE TOMIC.',
    imageGradient: 'from-amber-900 via-yellow-800 to-green-700', likes: 201, comments: 67,
    scorecard: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'p5', userId: 'u5',
    text: 'Campo número 34: Pedreña. Cuna de Seve Ballesteros. Las vistas al mar Cantábrico desde el green 18 son inmejorables. 🌊',
    imageGradient: 'from-slate-900 via-teal-800 to-green-600', likes: 58, comments: 14,
    scorecard: { total: 78, field: 'Pedreña', date: '25 jun', scores: [5,4,5,4,5,3,5,4,5], pars: [4,3,5,4,4,3,5,4,4] },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

export const STORIES = [
  { id: 's1', userId: 'u1', gradient: 'from-orange-600 to-green-700' },
  { id: 's2', userId: 'u3', gradient: 'from-blue-600 to-indigo-700' },
  { id: 's3', userId: 'u4', gradient: 'from-teal-600 to-cyan-700' },
  { id: 's4', userId: 'u7', gradient: 'from-amber-600 to-orange-700' },
  { id: 's5', userId: 'u9', gradient: 'from-green-600 to-emerald-700' },
]

export const NOTIFICATIONS = [
  { id: 'n1', type: 'join', fromUserId: 'u1', message: 'Carlos Martínez se unió a tu partida en Sevilla', createdAt: new Date(Date.now() - 600000).toISOString(), read: false },
  { id: 'n2', type: 'like', fromUserId: 'u2', message: 'Laura García y 12 personas más dieron like a tu post', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'n3', type: 'invite', fromUserId: 'u3', message: 'Javier Fernández te invita a su partida en El Prat', createdAt: new Date(Date.now() - 7200000).toISOString(), read: true },
  { id: 'n4', type: 'comment', fromUserId: 'u5', message: 'Andrés Sánchez comentó en tu scorecard', createdAt: new Date(Date.now() - 10800000).toISOString(), read: true },
  { id: 'n5', type: 'match', fromUserId: null, message: 'Tu partida en Valderrama tiene 1 plaza disponible', createdAt: new Date(Date.now() - 18000000).toISOString(), read: true },
]

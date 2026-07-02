// f1 Sevilla — diagramas oficiales sevillagolf.com
const _f1p = ['https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-1.png','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-2.png','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-3.png','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-4-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-5-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-6-1.png','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-7-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-8-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-9-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-10-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-11-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-12-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Hole-13.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-14-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-15-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-16-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-17-1.jpg','https://sevillagolf.com/wp-content/uploads/2022/08/Sevilla-Hole-18.jpg']
// f2 Costa del Sol — sin diagramas oficiales, fotos Wikimedia
const _f2p = ['https://upload.wikimedia.org/wikipedia/commons/0/09/Mijas_Golf_03.JPG','https://upload.wikimedia.org/wikipedia/commons/9/95/Mijas_Golf_04.JPG','https://upload.wikimedia.org/wikipedia/commons/e/e6/Mijas_Golf_05.JPG','https://upload.wikimedia.org/wikipedia/commons/d/da/Mijas_Golf_06.JPG','https://upload.wikimedia.org/wikipedia/commons/4/4a/Mijas_Golf_08.JPG','https://upload.wikimedia.org/wikipedia/commons/b/b2/Mijas_Golf_09.JPG','https://upload.wikimedia.org/wikipedia/commons/2/20/Mijas_Golf_10.JPG','https://upload.wikimedia.org/wikipedia/commons/5/59/Mijas_Golf_13.JPG','https://upload.wikimedia.org/wikipedia/commons/b/b1/Mijas_Golf_14.JPG','https://upload.wikimedia.org/wikipedia/commons/7/73/Mijas_Golf_15.JPG','https://upload.wikimedia.org/wikipedia/commons/4/4d/Mijas_Golf_16.JPG','https://upload.wikimedia.org/wikipedia/commons/c/cb/Mijas_Golf_17.JPG','https://upload.wikimedia.org/wikipedia/commons/5/53/Mijas_Golf_18.JPG','https://upload.wikimedia.org/wikipedia/commons/9/93/Mijas_Golf_19.JPG','https://upload.wikimedia.org/wikipedia/commons/4/4a/Mijas_Golf_20.JPG','https://upload.wikimedia.org/wikipedia/commons/1/11/Mijas_Golf_21.JPG','https://upload.wikimedia.org/wikipedia/commons/b/b0/Parador_de_M%C3%A1laga_Golf1.jpg','https://upload.wikimedia.org/wikipedia/commons/8/83/Parador_de_M%C3%A1laga_Golf2.jpg']
// f3 El Prat — diagramas oficiales Recorrido Rosa rcgep.com
const _f3p = ['https://rcgep.com/wp-content/uploads/2023/02/H1_rosa1-reducida-107x300-1.png','https://rcgep.com/wp-content/uploads/2023/04/H2-recorrido-rosa-2.webp','https://rcgep.com/wp-content/uploads/2023/04/H3-recorrido-rosa-3.webp','https://rcgep.com/wp-content/uploads/2023/04/H4-recorrido-rosa-4.webp','https://rcgep.com/wp-content/uploads/2023/04/H5-recorrido-rosa-5.webp','https://rcgep.com/wp-content/uploads/2023/04/H6-recorrido-rosa-6.webp','https://rcgep.com/wp-content/uploads/2023/04/H7-recorrido-rosa-7.webp','https://rcgep.com/wp-content/uploads/2023/04/H8-recorrido-rosa-8.webp','https://rcgep.com/wp-content/uploads/2023/04/H9-recorrido-rosa-9.webp','https://rcgep.com/wp-content/uploads/2023/04/H10-recorrido-rosa-10.webp','https://rcgep.com/wp-content/uploads/2023/04/H11-recorrido-rosa-11.webp','https://rcgep.com/wp-content/uploads/2023/04/H12-recorrido-rosa-12.webp','https://rcgep.com/wp-content/uploads/2023/04/H13-recorrido-rosa-13.webp','https://rcgep.com/wp-content/uploads/2023/04/H14-recorrido-rosa-14.webp','https://rcgep.com/wp-content/uploads/2023/04/H15-recorrido-rosa-15.webp','https://rcgep.com/wp-content/uploads/2023/04/H16-recorrido-rosa-16.webp','https://rcgep.com/wp-content/uploads/2023/04/H17-recorrido-rosa-17.webp','https://rcgep.com/wp-content/uploads/2023/04/H18-recorrido-rosa-18.webp']
// f4 La Moraleja — sin diagramas públicos, fotos Wikimedia
const _f4p = ['https://upload.wikimedia.org/wikipedia/commons/1/17/Golf_La_Moraleja.jpg','https://upload.wikimedia.org/wikipedia/commons/c/c2/RCPH_01.jpg','https://upload.wikimedia.org/wikipedia/commons/2/25/RCPH_02.jpg','https://upload.wikimedia.org/wikipedia/commons/7/75/RCPH_03.jpg','https://upload.wikimedia.org/wikipedia/commons/4/49/RCPH_04.jpg','https://upload.wikimedia.org/wikipedia/commons/9/9d/Golf_and_Croquet_at_Puerta_de_Hierro.jpg','https://upload.wikimedia.org/wikipedia/commons/2/2c/Cuarenta_Fanegas_bunker.jpg','https://upload.wikimedia.org/wikipedia/commons/9/9a/Golf_Terramar_-_20221101_110651.jpg','https://upload.wikimedia.org/wikipedia/commons/8/8f/Golf_Terramar_i_rodalies_-_P1040856.jpg','https://upload.wikimedia.org/wikipedia/commons/c/cd/09_Club_de_Golf_Sant_Cugat_%28Sant_Cugat_del_Vall%C3%A8s%29%2C_des_del_passeig_de_Can_M%C3%B3ra.jpg','https://upload.wikimedia.org/wikipedia/commons/2/23/Camp_de_golf_Sant_Cugat.jpg','https://upload.wikimedia.org/wikipedia/commons/b/b0/Parador_de_M%C3%A1laga_Golf1.jpg','https://upload.wikimedia.org/wikipedia/commons/8/83/Parador_de_M%C3%A1laga_Golf2.jpg','https://upload.wikimedia.org/wikipedia/commons/5/57/Parador_de_M%C3%A1laga_Golf3.jpg','https://upload.wikimedia.org/wikipedia/commons/9/90/Parador_de_M%C3%A1laga_Golf4.jpg','https://upload.wikimedia.org/wikipedia/commons/d/dc/Parador_de_M%C3%A1laga_Golf5.jpg','https://upload.wikimedia.org/wikipedia/commons/1/17/Golf_La_Moraleja.jpg','https://upload.wikimedia.org/wikipedia/commons/c/c2/RCPH_01.jpg']
// f5 Las Palmas — diagramas oficiales realclubdegolfdelaspalmas.com
const _f5p = ['https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-1.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-2.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-3.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-4.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-5.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-6.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-7.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-8.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-9.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-10.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-11.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-12.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-13.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-14.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-15.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-16.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-17.jpg','https://realclubdegolfdelaspalmas.com/wp-content/uploads/HOYO-18.jpg']
// f6 Neguri — diagramas oficiales rsgolfneguri.com
const _f6p = ['https://www.rsgolfneguri.com/images/Hoyos/Hoyo01.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo02.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo03.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo04.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo05.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo06.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo07.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo08.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo09.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo10.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo11.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo12.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo13.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo14.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo15.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo16.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo17.jpg','https://www.rsgolfneguri.com/images/Hoyos/Hoyo18.jpg']
// f7 Valderrama — fotos oficiales por hoyo valderrama.com (no tienen diagramas cenital)
const _f7p = ['https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_1_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_2_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_3_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_4_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_5_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_6_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_7_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_8_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_9_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_10_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_11_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_12_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_13_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_14_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_15_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_16_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_17_909x1363.jpg','https://www.valderrama.com/wp-content/uploads/2020/04/HOYO_18_909x1363.jpg']
// f8 Pedreña — sin diagramas oficiales, fotos Wikimedia
const _f8p = ['https://upload.wikimedia.org/wikipedia/commons/1/13/Campo_de_Golf_%28Pedre%C3%B1a%29.jpg','https://upload.wikimedia.org/wikipedia/commons/c/cb/Jugando_al_golf_en_el_Club_de_Pedre%C3%B1a._Cantabria.jpg','https://upload.wikimedia.org/wikipedia/commons/d/d4/MontecastilloJerez-GolfCourse-P1070448.JPG','https://upload.wikimedia.org/wikipedia/commons/3/31/MontecastilloJerez-GolfCourse-P1070460.JPG','https://upload.wikimedia.org/wikipedia/commons/5/55/Montecastillo_Jerez-IMG_20210703_141527.jpg','https://upload.wikimedia.org/wikipedia/commons/5/5c/Montecastillo_Jerez-IMG_20210703_141638.jpg','https://upload.wikimedia.org/wikipedia/commons/4/4c/Montecastillo_Jerez-P1560287.jpg','https://upload.wikimedia.org/wikipedia/commons/1/1f/Montecastillo-IMG_20210703_195711.jpg','https://upload.wikimedia.org/wikipedia/commons/6/6b/Montecastillo-IMG_20210703_195836.jpg','https://upload.wikimedia.org/wikipedia/commons/0/08/Sherry_Golf_Jerez_-_P1110680.jpg','https://upload.wikimedia.org/wikipedia/commons/2/25/Sherry_Golf_Jerez_-_P1110681.jpg','https://upload.wikimedia.org/wikipedia/commons/5/5b/Sherry_Golf_Jerez_-_P1110687.jpg','https://upload.wikimedia.org/wikipedia/commons/3/31/Sherry_Golf_Jerez_-_P1110688.jpg','https://upload.wikimedia.org/wikipedia/commons/7/74/Sherry_Golf_Jerez_-_P1110692.jpg','https://upload.wikimedia.org/wikipedia/commons/1/13/Campo_de_Golf_%28Pedre%C3%B1a%29.jpg','https://upload.wikimedia.org/wikipedia/commons/c/cb/Jugando_al_golf_en_el_Club_de_Pedre%C3%B1a._Cantabria.jpg','https://upload.wikimedia.org/wikipedia/commons/d/d4/MontecastilloJerez-GolfCourse-P1070448.JPG','https://upload.wikimedia.org/wikipedia/commons/3/31/MontecastilloJerez-GolfCourse-P1070460.JPG']

export const FIELDS = [
  { id: 'f1', name: 'Real Club de Golf de Sevilla', location: 'Sevilla, Andalucía', holes: 18, par: 72, courseRating: 73.5, slope: 135, rating: 4.9, isPartner: true, gradient: 'from-amber-900 via-green-800 to-green-600', holePhotos: _f1p },
  { id: 'f2', name: 'Club de Golf Costa del Sol', location: 'Málaga, Andalucía', holes: 18, par: 72, courseRating: 72.1, slope: 128, rating: 4.8, isPartner: true, gradient: 'from-teal-900 via-green-700 to-cyan-600', holePhotos: _f2p },
  { id: 'f3', name: 'Real Club de Golf El Prat', location: 'Barcelona, Cataluña', holes: 18, par: 72, courseRating: 74.2, slope: 141, rating: 4.7, isPartner: true, gradient: 'from-indigo-900 via-blue-800 to-green-700', holePhotos: _f3p },
  { id: 'f4', name: 'Club de Golf La Moraleja', location: 'Madrid', holes: 18, par: 72, courseRating: 73.8, slope: 137, rating: 4.9, isPartner: true, gradient: 'from-red-900 via-amber-800 to-green-700', holePhotos: _f4p },
  { id: 'f5', name: 'Real Club de Golf Las Palmas', location: 'Las Palmas, Canarias', holes: 18, par: 71, courseRating: 70.5, slope: 124, rating: 4.6, isPartner: true, gradient: 'from-gray-900 via-green-900 to-green-600', holePhotos: _f5p },
  { id: 'f6', name: 'Club de Golf Neguri', location: 'Bilbao, País Vasco', holes: 18, par: 70, courseRating: 69.8, slope: 122, rating: 4.5, isPartner: false, gradient: 'from-slate-800 via-green-800 to-green-500', holePhotos: _f6p },
  { id: 'f7', name: 'Club de Golf Valderrama', location: 'Sotogrande, Andalucía', holes: 18, par: 71, courseRating: 75.7, slope: 147, rating: 5.0, isPartner: true, gradient: 'from-green-950 via-green-800 to-emerald-600', holePhotos: _f7p },
  { id: 'f8', name: 'Real Club de Golf de Pedreña', location: 'Pedreña, Cantabria', holes: 18, par: 71, courseRating: 71.2, slope: 130, rating: 4.8, isPartner: true, gradient: 'from-slate-900 via-teal-800 to-green-600', holePhotos: _f8p },
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

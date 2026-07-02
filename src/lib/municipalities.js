// Spanish golf-area municipalities with coordinates
export const MUNICIPALITIES = [
  { name: 'Las Rozas', province: 'Madrid', lat: 40.493, lng: -3.871 },
  { name: 'Pozuelo de Alarcón', province: 'Madrid', lat: 40.438, lng: -3.813 },
  { name: 'Majadahonda', province: 'Madrid', lat: 40.473, lng: -3.872 },
  { name: 'Boadilla del Monte', province: 'Madrid', lat: 40.401, lng: -3.876 },
  { name: 'Alcobendas', province: 'Madrid', lat: 40.547, lng: -3.641 },
  { name: 'Torrejón de Ardoz', province: 'Madrid', lat: 40.459, lng: -3.479 },
  { name: 'Getafe', province: 'Madrid', lat: 40.305, lng: -3.731 },
  { name: 'Alcalá de Henares', province: 'Madrid', lat: 40.481, lng: -3.364 },
  { name: 'Móstoles', province: 'Madrid', lat: 40.322, lng: -3.863 },
  { name: 'Leganés', province: 'Madrid', lat: 40.329, lng: -3.764 },
  { name: 'Fuenlabrada', province: 'Madrid', lat: 40.284, lng: -3.801 },
  { name: 'Alcorcón', province: 'Madrid', lat: 40.347, lng: -3.823 },
  { name: 'Valdemoro', province: 'Madrid', lat: 40.189, lng: -3.677 },
  { name: 'Madrid Centro', province: 'Madrid', lat: 40.417, lng: -3.704 },
  { name: 'Madrid Norte', province: 'Madrid', lat: 40.480, lng: -3.680 },
  { name: 'Madrid Sur', province: 'Madrid', lat: 40.370, lng: -3.700 },
  { name: 'Collado Villalba', province: 'Madrid', lat: 40.637, lng: -4.004 },
  { name: 'San Sebastián de los Reyes', province: 'Madrid', lat: 40.549, lng: -3.625 },

  { name: 'Sevilla', province: 'Sevilla', lat: 37.389, lng: -5.985 },
  { name: 'Dos Hermanas', province: 'Sevilla', lat: 37.284, lng: -5.921 },
  { name: 'Mairena del Aljarafe', province: 'Sevilla', lat: 37.381, lng: -6.063 },
  { name: 'Écija', province: 'Sevilla', lat: 37.542, lng: -5.083 },

  { name: 'Málaga', province: 'Málaga', lat: 36.721, lng: -4.421 },
  { name: 'Marbella', province: 'Málaga', lat: 36.510, lng: -4.884 },
  { name: 'Estepona', province: 'Málaga', lat: 36.428, lng: -5.148 },
  { name: 'Torremolinos', province: 'Málaga', lat: 36.621, lng: -4.501 },
  { name: 'Benalmádena', province: 'Málaga', lat: 36.600, lng: -4.517 },
  { name: 'Fuengirola', province: 'Málaga', lat: 36.540, lng: -4.625 },
  { name: 'Mijas', province: 'Málaga', lat: 36.597, lng: -4.638 },

  { name: 'Sotogrande', province: 'Cádiz', lat: 36.274, lng: -5.316 },
  { name: 'Jerez de la Frontera', province: 'Cádiz', lat: 36.683, lng: -6.136 },
  { name: 'Cádiz', province: 'Cádiz', lat: 36.527, lng: -6.289 },

  { name: 'Barcelona', province: 'Barcelona', lat: 41.385, lng: 2.173 },
  { name: 'Sitges', province: 'Barcelona', lat: 41.237, lng: 1.813 },
  { name: 'Sant Cugat del Vallès', province: 'Barcelona', lat: 41.473, lng: 2.089 },
  { name: 'Castelldefels', province: 'Barcelona', lat: 41.278, lng: 1.977 },
  { name: 'Gavà', province: 'Barcelona', lat: 41.304, lng: 1.999 },
  { name: 'El Prat de Llobregat', province: 'Barcelona', lat: 41.325, lng: 2.104 },

  { name: 'Bilbao', province: 'Vizcaya', lat: 43.263, lng: -2.935 },
  { name: 'Getxo', province: 'Vizcaya', lat: 43.356, lng: -2.993 },
  { name: 'Barakaldo', province: 'Vizcaya', lat: 43.297, lng: -2.990 },
  { name: 'Leioa', province: 'Vizcaya', lat: 43.333, lng: -2.980 },

  { name: 'Santander', province: 'Cantabria', lat: 43.462, lng: -3.810 },
  { name: 'Pedreña', province: 'Cantabria', lat: 43.455, lng: -3.787 },
  { name: 'Laredo', province: 'Cantabria', lat: 43.413, lng: -3.414 },

  { name: 'Las Palmas de Gran Canaria', province: 'Las Palmas', lat: 28.124, lng: -15.437 },
  { name: 'Maspalomas', province: 'Las Palmas', lat: 27.758, lng: -15.587 },
  { name: 'Santa Brígida', province: 'Las Palmas', lat: 28.024, lng: -15.499 },

  { name: 'Valencia', province: 'Valencia', lat: 39.470, lng: -0.376 },
  { name: 'Alicante', province: 'Alicante', lat: 38.345, lng: -0.481 },
  { name: 'Zaragoza', province: 'Zaragoza', lat: 41.649, lng: -0.889 },
  { name: 'Palma', province: 'Islas Baleares', lat: 39.570, lng: 2.650 },
  { name: 'San Sebastián', province: 'Guipúzcoa', lat: 43.318, lng: -1.982 },
  { name: 'A Coruña', province: 'A Coruña', lat: 43.362, lng: -8.412 },
  { name: 'Pontevedra', province: 'Pontevedra', lat: 42.433, lng: -8.645 },
]

export function getMunicipalityCoords(municipalityName, cityFallback) {
  const m = MUNICIPALITIES.find(m =>
    m.name.toLowerCase() === (municipalityName || '').toLowerCase() ||
    m.name.toLowerCase() === (cityFallback || '').toLowerCase()
  )
  return m ? { lat: m.lat, lng: m.lng } : null
}

export function getMunicipalityLabel(name, province) {
  if (!name) return null
  if (!province || name.toLowerCase().includes(province.toLowerCase())) return name
  return `${name}, ${province}`
}

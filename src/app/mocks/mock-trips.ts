import { Trip } from '../interfaces/trip.interface'

export const MOCK_TRIPS: Trip[] = [
  // Rio de Janeiro
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-04',
    departureTime: '08:15',
    basePrice: 389,
    availableSeats: 7
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-04',
    departureTime: '11:30',
    basePrice: 398,
    availableSeats: 10
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-04',
    departureTime: '17:10',
    basePrice: 421,
    availableSeats: 3
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-04',
    departureTime: '22:00',
    basePrice: 421,
    availableSeats: 18
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 85 },
    departureDate: '2026-06-05',
    departureTime: '10:00',
    basePrice: 415,
    availableSeats: 12
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-05',
    departureTime: '11:30',
    basePrice: 398,
    availableSeats: 10
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-05',
    departureTime: '22:00',
    basePrice: 421,
    availableSeats: 18
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 90 },
    departureDate: '2026-06-06',
    departureTime: '14:30',
    basePrice: 350,
    availableSeats: 3
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-06',
    departureTime: '11:30',
    basePrice: 398,
    availableSeats: 10
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-06',
    departureTime: '22:00',
    basePrice: 421,
    availableSeats: 18
  },

  // Curitiba
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Curitiba', estimatedDuration: 300 },
    departureDate: '2026-06-04',
    departureTime: '07:00',
    basePrice: 259,
    availableSeats: 20
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Curitiba', estimatedDuration: 300 },
    departureDate: '2026-06-05',
    departureTime: '12:00',
    basePrice: 279,
    availableSeats: 15
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Curitiba', estimatedDuration: 300 },
    departureDate: '2026-06-06',
    departureTime: '18:30',
    basePrice: 299,
    availableSeats: 9
  },

  // Belo Horizonte
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Belo Horizonte', estimatedDuration: 480 },
    departureDate: '2026-06-04',
    departureTime: '06:30',
    basePrice: 499,
    availableSeats: 5
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Belo Horizonte', estimatedDuration: 480 },
    departureDate: '2026-06-05',
    departureTime: '13:15',
    basePrice: 479,
    availableSeats: 11
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Belo Horizonte', estimatedDuration: 480 },
    departureDate: '2026-06-06',
    departureTime: '21:00',
    basePrice: 459,
    availableSeats: 4
  }
]

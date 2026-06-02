import { Trip } from './trip.interface'

export interface Booking {
  bookingId: string
  trip: Trip
  seat: number
  passenger: {
    fullName: string
    cpf: string
    email: string
  }
}

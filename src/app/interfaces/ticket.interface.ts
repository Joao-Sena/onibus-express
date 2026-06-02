import { Passenger } from './passenger.interface'

export interface Ticket {
  destination: string
  passenger: Passenger
  seatNumber: string
  status: string
  bookingCode: string
}

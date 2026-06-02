import { Route } from './route.interface'

export interface Trip {
  associatedRoute: Route
  departureDate: string
  departureTime: string
  basePrice: number
  availableSeats: number
}

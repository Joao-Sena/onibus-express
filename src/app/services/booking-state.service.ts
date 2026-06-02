import { Injectable, signal } from '@angular/core'
import { Trip } from '../interfaces/trip.interface'

@Injectable({ providedIn: 'root' })
export class BookingStateService {
  private selectedTrip = signal<Trip | null>(null)
  private selectedSeat = signal<number | null>(null)

  setTrip(trip: Trip): void {
    this.selectedTrip.set(trip)
  }

  getTrip(): Trip | null {
    return this.selectedTrip()
  }

  setSeat(seatNumber: number): void {
    this.selectedSeat.set(seatNumber)
  }

  getSeat(): number | null {
    return this.selectedSeat()
  }
}

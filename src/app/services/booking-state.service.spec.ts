import { TestBed } from '@angular/core/testing'
import { BookingStateService } from './booking-state.service'
import { Trip } from '../interfaces/trip.interface'

describe('BookingStateService', () => {
  let service: BookingStateService
  const sampleTrip: Trip = {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 60 },
    departureDate: '2026-06-10',
    departureTime: '14:00',
    basePrice: 199,
    availableSeats: 10
  }

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BookingStateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should store and retrieve selected trip', () => {
    expect(service.getTrip()).toBeNull()
    service.setTrip(sampleTrip)
    expect(service.getTrip()).toEqual(sampleTrip)
  })

  it('should store and retrieve selected seat', () => {
    expect(service.getSeat()).toBeNull()
    service.setSeat(15)
    expect(service.getSeat()).toBe(15)
  })
})
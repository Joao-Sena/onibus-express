import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { TripService } from './trip.service'
import { MOCK_TRIPS } from '../mocks/mock-trips'
import { Trip } from '../interfaces/trip.interface'

describe('TripService', () => {
  let service: TripService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TripService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return all trips after 3 seconds', fakeAsync(() => {
    let result: Trip[] | undefined

    service.getTrips().subscribe(trips => {
      result = trips
    })

    expect(result).toBeUndefined()

    tick(3000)

    expect(result).toEqual(MOCK_TRIPS)
    expect(result).toHaveLength(MOCK_TRIPS.length)
  }))

  it('should not emit before 3 seconds have passed', fakeAsync(() => {
    let emitted = false

    service.getTrips().subscribe(() => {
      emitted = true
    })

    tick(2999)
    expect(emitted).toBe(false)

    tick(1)
    expect(emitted).toBe(true)
  }))

  it('should return trips matching the correct shape', fakeAsync(() => {
    let result: Trip[] | undefined

    service.getTrips().subscribe(trips => {
      result = trips
    })

    tick(3000)

    result!.forEach(trip => {
      expect(trip).toHaveProperty('associatedRoute')
      expect(trip).toHaveProperty('departureDate')
      expect(trip).toHaveProperty('departureTime')
      expect(trip).toHaveProperty('basePrice')
      expect(trip).toHaveProperty('availableSeats')
    })
  }))
})

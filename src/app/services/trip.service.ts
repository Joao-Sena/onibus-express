import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Trip } from '../interfaces/trip.interface'
import { MOCK_TRIPS } from '../mocks/mock-trips'

@Injectable({ providedIn: 'root' })

export class TripService {

  getTrips(): Observable<Trip[]> {
    return of(MOCK_TRIPS).pipe(delay(3000));
  }

}

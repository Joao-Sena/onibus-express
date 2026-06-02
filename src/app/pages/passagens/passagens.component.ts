import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { take } from 'rxjs/operators'
import { Trip } from '../../interfaces/trip.interface'
import { TripService } from '../../services/trip.service'
import { BookingStateService } from '../../services/booking-state.service'

@Component({
  selector: 'page-passagens',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './passagens.component.html',
  styleUrls: ['./passagens.component.scss']
})
export class PassagensComponent {
  private formBuilder = inject(FormBuilder)
  private tripService = inject(TripService)
  private bookingStateService = inject(BookingStateService)
  private router = inject(Router)

  form: FormGroup = this.formBuilder.group({
    origin: ['São Paulo', Validators.required],
    destination: ['Rio de Janeiro', Validators.required],
    date: ['2026-06-04', Validators.required]
  })

  results: Trip[] | null = null
  submitted = false
  loading = false

  onSearch() {
    const { origin, destination, date } = this.form.value

    this.loading = true

    this.tripService.getTrips().pipe(take(1)).subscribe(trips => {
      this.results = trips.filter((trip) =>
        trip.associatedRoute.origin.toLowerCase() === origin.toLowerCase() &&
        trip.associatedRoute.destination.toLowerCase() === destination.toLowerCase() &&
        trip.departureDate === date
      )
      this.submitted = true
      this.loading = false
    })
  }

  selectTravel(trip: Trip): void {
    this.bookingStateService.setTrip(trip);
    this.router.navigate(['/assentos']);
  }

  addMinutes(time: string, minutes: number) {
    // time is expected as HH:mm
    const [hh, mm] = time.split(':').map((v) => parseInt(v, 10))
    const dt = new Date()
    dt.setHours(hh)
    dt.setMinutes(mm + minutes)
    const h = dt.getHours().toString().padStart(2, '0')
    const m = dt.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
  }
}

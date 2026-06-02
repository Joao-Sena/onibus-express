import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Trip } from '../../interfaces/trip.interface'
import { BookingStateService } from '../../services/booking-state.service'
import { CommonModule } from '@angular/common';

interface Seat {
  number: number
  available: boolean
}

@Component({
  selector: 'app-assentos',
  imports: [CommonModule],
  templateUrl: './assentos.component.html',
  styleUrl: './assentos.component.scss',
})
export class AssentosComponent implements OnInit {
  private bookingStateService = inject(BookingStateService)
  private router = inject(Router)

  trip: Trip | null = this.bookingStateService.getTrip()
  seatRows: Seat[][] = []
  selectedSeat: number | null = null

  selectSeat(seat: Seat): void {
    this.selectedSeat = this.selectedSeat === seat.number ? null : seat.number
  }

  confirmSeat(): void {
    if (this.selectedSeat) {
      this.bookingStateService.setSeat(this.selectedSeat);
      this.router.navigate(['/confirmacao']);

    }
  }

  ngOnInit(): void {
    if (!this.trip) {
      this.router.navigate(['/passagens']);
    }

    this.buildSeats()
  }

  private buildSeats(): void {
    const total = 40
    const unavailableCount = total - (this.trip?.availableSeats ?? 0)

    const allSeats: Seat[] = Array.from({ length: total }, (_, i) => ({
      number: i + 1,
      available: true
    }))

    const shuffledIndices = Array.from({ length: total }, (_, i) => i)
      .sort(() => Math.random() - 0.5)

    shuffledIndices.slice(0, unavailableCount).forEach(i => {
      allSeats[i].available = false
    })

    this.seatRows = Array.from({ length: 10 }, (_, i) => allSeats.slice(i * 4, i * 4 + 4))
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

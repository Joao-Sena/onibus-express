import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Booking } from '../../interfaces/booking.interface'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'page-minha-reserva',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './minha-reserva.component.html',
  styleUrl: './minha-reserva.component.scss',
})
export class MinhaReservaComponent implements OnInit {
  booking: Booking | null = null

  ngOnInit(): void {
    const stored = localStorage.getItem('booking')
    if (stored) {
      this.booking = JSON.parse(stored)
    }
  }

  isCancelDisabled(): boolean {
    if (!this.booking) return true

    const now = new Date()
    const [year, month, day] = this.booking.trip.departureDate.split('-').map(Number)
    const [hours, minutes] = this.booking.trip.departureTime.split(':').map(Number)
    const departure = new Date(year, month - 1, day, hours, minutes)

    const sameDay =
      now.getFullYear() === departure.getFullYear() &&
      now.getMonth() === departure.getMonth() &&
      now.getDate() === departure.getDate()

    if (!sameDay) return false

    const diffHours = (departure.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffHours < 2
  }

  cancelBooking(): void {
    localStorage.removeItem('booking')
    this.booking = null
  }

  addMinutes(time: string, minutes: number): string {
    const [hh, mm] = time.split(':').map(v => parseInt(v, 10))
    const dt = new Date()
    dt.setHours(hh)
    dt.setMinutes(mm + minutes)
    const h = dt.getHours().toString().padStart(2, '0')
    const m = dt.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
  }
}

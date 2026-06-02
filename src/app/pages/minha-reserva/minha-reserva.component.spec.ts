import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MinhaReservaComponent } from './minha-reserva.component'
import { Booking } from '../../interfaces/booking.interface'

describe('MinhaReservaComponent', () => {
  const booking: Booking = {
    bookingId: '1234',
    trip: {
      associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 240 },
      departureDate: '2026-06-10',
      departureTime: '08:00',
      basePrice: 300,
      availableSeats: 15
    },
    seat: 7,
    passenger: {
      fullName: 'João Silva',
      cpf: '529.982.247-25',
      email: 'joao@example.com'
    }
  }

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      imports: [MinhaReservaComponent, RouterTestingModule]
    })
  })

  it('should create the component without stored booking', () => {
    const fixture = TestBed.createComponent(MinhaReservaComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    expect(component).toBeTruthy()
    expect(component.booking).toBeNull()
  })

  it('should load booking from localStorage on init', () => {
    localStorage.setItem('booking', JSON.stringify(booking))
    const fixture = TestBed.createComponent(MinhaReservaComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    expect(component.booking).toEqual(booking)
  })

  it('should cancel booking and clear storage', () => {
    localStorage.setItem('booking', JSON.stringify(booking))
    const fixture = TestBed.createComponent(MinhaReservaComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    expect(component.booking).toEqual(booking)
    component.cancelBooking()

    expect(component.booking).toBeNull()
    expect(localStorage.getItem('booking')).toBeNull()
  })

  it('addMinutes should calculate an arrival time', () => {
    const fixture = TestBed.createComponent(MinhaReservaComponent)
    const component = fixture.componentInstance

    expect(component.addMinutes('10:30', 90)).toBe('12:00')
    expect(component.addMinutes('23:30', 45)).toBe('00:15')
  })
})
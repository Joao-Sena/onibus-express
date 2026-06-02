import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { ConfirmacaoComponent } from './confirmacao.component'
import { BookingStateService } from '../../services/booking-state.service'
import { CpfValidationService } from '../../services/cpf-validation.service'
import { Trip } from '../../interfaces/trip.interface'

describe('ConfirmacaoComponent', () => {
  const trip: Trip = {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 60 },
    departureDate: '2026-06-10',
    departureTime: '10:00',
    basePrice: 200,
    availableSeats: 5
  }

  let routerSpy: { navigate: jest.Mock }

  beforeEach(async () => {
    routerSpy = { navigate: jest.fn() }

    await TestBed.configureTestingModule({
      imports: [ConfirmacaoComponent, RouterTestingModule],
      providers: [
        {
          provide: BookingStateService,
          useValue: {
            getTrip: () => trip,
            getSeat: () => 10
          }
        },
        {
          provide: CpfValidationService,
          useValue: {
            validate: () => of(true)
          }
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents()
  })

  it('should create and initialize trip data', () => {
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    expect(component).toBeTruthy()
    expect(component.trip).toEqual(trip)
    expect(component.seat).toBe(10)
  })

  it('should navigate to passagens when no trip is present', () => {
    const noTripRouterSpy = { navigate: jest.fn() }
    const noTripServiceStub = {
      getTrip: () => null,
      getSeat: () => null
    }

    TestBed.overrideProvider(BookingStateService, { useValue: noTripServiceStub })
    TestBed.overrideProvider(Router, { useValue: noTripRouterSpy })

    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    fixture.detectChanges()

    expect(noTripRouterSpy.navigate).toHaveBeenCalledWith(['/passagens'])
  })

  it('should format CPF input while typing', () => {
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.form.get('cpf')?.setValue('52998224725')
    expect(component.form.get('cpf')?.value).toBe('529.982.247-25')
  })

  it('should format CPF input at intermediate lengths', () => {
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.form.get('cpf')?.setValue('5299')
    expect(component.form.get('cpf')?.value).toBe('529.9')

    component.form.get('cpf')?.setValue('5299822')
    expect(component.form.get('cpf')?.value).toBe('529.982.2')
  })

  it('should confirm booking when form is valid', fakeAsync(() => {
    localStorage.clear()
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.form.setValue({
      fullName: 'Maria Silva',
      cpf: '529.982.247-25',
      email: 'maria@example.com'
    })

    tick()
    component.confirm()

    expect(component.confirmed).toBe(true)
    expect(component.bookingCode).toHaveLength(4)
    expect(localStorage.getItem('booking')).toContain(component.bookingCode!)
  }))

  it('should not confirm booking when form is invalid', fakeAsync(() => {
    localStorage.clear()
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.form.setValue({
      fullName: '',
      cpf: '',
      email: 'invalid-email'
    })

    component.confirm()

    expect(component.confirmed).toBe(false)
    expect(component.bookingCode).toBeNull()
    expect(localStorage.getItem('booking')).toBeNull()
  }))

  it('should return null from cpfAsyncValidator when cpf is empty', async () => {
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance
    fixture.detectChanges()

    const validator = (component as any).cpfAsyncValidator() as (control: { value: string }) => Promise<null | { cpfInvalido: true }>
    const result = await validator({ value: '' })

    expect(result).toBeNull()
  })

  it('addMinutes should compute arrival correctly', () => {
    const fixture = TestBed.createComponent(ConfirmacaoComponent)
    const component = fixture.componentInstance

    expect(component.addMinutes('08:15', 75)).toBe('09:30')
    expect(component.addMinutes('23:50', 20)).toBe('00:10')
  })
})
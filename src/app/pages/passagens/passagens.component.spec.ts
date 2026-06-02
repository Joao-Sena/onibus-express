import { TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { PassagensComponent } from './passagens.component'
import { TripService } from '../../services/trip.service'
import { Trip } from '../../interfaces/trip.interface'

const mockTrips: Trip[] = [
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 75 },
    departureDate: '2026-06-04',
    departureTime: '08:15',
    basePrice: 389,
    availableSeats: 7
  },
  {
    associatedRoute: { origin: 'São Paulo', destination: 'Curitiba', estimatedDuration: 300 },
    departureDate: '2026-06-05',
    departureTime: '12:00',
    basePrice: 279,
    availableSeats: 15
  }
]

describe('PassagensComponent (unit)', () => {
  let component: PassagensComponent

  beforeEach(() => {
    const tripServiceStub: Partial<TripService> = {
      getTrips: () => of(mockTrips)
    }

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        PassagensComponent,
        FormBuilder,
        { provide: TripService, useValue: tripServiceStub }
      ]
    })

    component = TestBed.inject(PassagensComponent)
  })

  it('should initialize with valid form and no results', () => {
    expect(component.form.valid).toBeTruthy()
    expect(component.results).toBeNull()
    expect(component.submitted).toBeFalsy()
  })

  it('should enable search when form filled and find matching trips', () => {
    component.form.setValue({ origin: 'São Paulo', destination: 'Rio de Janeiro', date: '2026-06-04' })
    expect(component.form.valid).toBeTruthy()

    component.onSearch()

    expect(component.submitted).toBeTruthy()
    expect(Array.isArray(component.results)).toBeTruthy()
    expect(component.results && component.results.length).toBeGreaterThan(0)
    const first = component.results![0]
    expect(first.associatedRoute.destination).toBe('Rio de Janeiro')
  })

  it('should return empty results when no trips match', () => {
    component.form.setValue({ origin: 'São Paulo', destination: 'Não Existe', date: '2026-06-04' })
    component.onSearch()
    expect(component.submitted).toBeTruthy()
    expect(component.results).toBeDefined()
    expect(component.results && component.results.length).toBe(0)
  })

  it('addMinutes should calculate arrival time correctly', () => {
    expect(component.addMinutes('08:15', 75)).toBe('09:30')
    expect(component.addMinutes('23:50', 20)).toBe('00:10')
  })

  it('should navigate to assentos when selectTravel is called', () => {
    const router = TestBed.inject(Router)
    const spy = jest.spyOn(router, 'navigate')
    component.selectTravel(mockTrips[0])

    expect(spy).toHaveBeenCalledWith(['/assentos'])
  })

  it('mock data sanity check', () => {
    // ensure our mock contains expected entries used by tests
    const hasRio = mockTrips.some(m => m.associatedRoute.destination === 'Rio de Janeiro')
    expect(hasRio).toBeTruthy()
  })
})

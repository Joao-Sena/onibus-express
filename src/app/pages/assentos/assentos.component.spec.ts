import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AssentosComponent } from './assentos.component';
import { BookingStateService } from '../../services/booking-state.service';
import { Trip } from '../../interfaces/trip.interface';

const sampleTrip: Trip = {
  associatedRoute: { origin: 'São Paulo', destination: 'Rio de Janeiro', estimatedDuration: 60 },
  departureDate: '2026-06-10',
  departureTime: '10:00',
  basePrice: 199,
  availableSeats: 20
};

describe('AssentosComponent', () => {
  let component: AssentosComponent;
  let fixture: ComponentFixture<AssentosComponent>;
  let router: Router;
  let setSeatSpy: jest.Mock;

  beforeEach(async () => {
    setSeatSpy = jest.fn();

    await TestBed.configureTestingModule({
      imports: [AssentosComponent, RouterTestingModule],
      providers: [
        {
          provide: BookingStateService,
          useValue: {
            getTrip: () => sampleTrip,
            setSeat: setSeatSpy
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    fixture = TestBed.createComponent(AssentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle seat selection', () => {
    const seat = { number: 1, available: true };
    component.selectSeat(seat);
    expect(component.selectedSeat).toBe(1);
    component.selectSeat(seat);
    expect(component.selectedSeat).toBeNull();
  });

  it('should not confirm seat when none is selected', () => {
    component.selectedSeat = null;
    component.confirmSeat();
    expect(setSeatSpy).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/confirmacao']);
  });

  it('should confirm seat and navigate when selected', () => {
    component.selectedSeat = 5;
    component.confirmSeat();
    expect(setSeatSpy).toHaveBeenCalledWith(5);
    expect(router.navigate).toHaveBeenCalledWith(['/confirmacao']);
  });

  it('should navigate to passagens when trip is missing', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.trip = null
    component.ngOnInit()

    expect(navigateSpy).toHaveBeenCalledWith(['/passagens'])
  });
});

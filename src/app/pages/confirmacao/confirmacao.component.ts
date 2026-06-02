import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractControl, AsyncValidatorFn, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { BookingStateService } from '../../services/booking-state.service'
import { CpfValidationService } from '../../services/cpf-validation.service'
import { Trip } from '../../interfaces/trip.interface'

@Component({
  selector: 'page-confirmacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss',
})
export class ConfirmacaoComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private bookingStateService = inject(BookingStateService)
  private cpfValidationService = inject(CpfValidationService)
  private router = inject(Router)

  trip: Trip | null = this.bookingStateService.getTrip()
  seat: number | null = this.bookingStateService.getSeat()

  form: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    cpf: [
      '',
      [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
      [this.cpfAsyncValidator()]
    ],
    email: ['', [Validators.required, Validators.email]]
  })

  confirmed = false
  bookingCode: string | null = null

  ngOnInit(): void {
    if (!this.trip) {
      this.router.navigate(['/passagens'])
      return
    }

    this.form.get('cpf')?.valueChanges.subscribe(value => {
      if (!value) return

      const digits = String(value).replace(/\D/g, '').slice(0, 11)
      let formatted = digits

      if (digits.length > 9) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
      } else if (digits.length > 6) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
      } else if (digits.length > 3) {
        formatted = `${digits.slice(0, 3)}.${digits.slice(3)}`
      }

      if (value !== formatted) {
        this.form.get('cpf')?.setValue(formatted, { emitEvent: false })
      }
    })
  }

  private cpfAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return Promise.resolve(null)
      return this.cpfValidationService.validate(control.value).pipe(
        map(isValid => (isValid ? null : { cpfInvalido: true }))
      )
    }
  }

  confirm(): void {
    if (this.form.invalid) return

    this.bookingCode = Math.floor(1000 + Math.random() * 9000).toString()

    const booking = {
      bookingId: this.bookingCode,
      trip: this.trip,
      seat: this.seat,
      passenger: this.form.value
    }

    localStorage.setItem('booking', JSON.stringify(booking))
    this.confirmed = true
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

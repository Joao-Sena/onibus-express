import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class CpfValidationService {

  validate(cpf: string): Observable<boolean> {
    const digits = cpf.replace(/\D/g, '')
    return of(this.isValid(digits))
  }

  private isValid(digits: string): boolean {
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false

    const calcDigit = (slice: string): number => {
      const sum = slice.split('').reduce((acc, d, i) => acc + +d * (slice.length + 1 - i), 0)
      const rem = (sum * 10) % 11
      return rem === 10 ? 0 : rem
    }

    return (
      calcDigit(digits.slice(0, 9)) === +digits[9] &&
      calcDigit(digits.slice(0, 10)) === +digits[10]
    )
  }
}

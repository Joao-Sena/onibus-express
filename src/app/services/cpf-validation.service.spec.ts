import { TestBed } from '@angular/core/testing'
import { CpfValidationService } from './cpf-validation.service'
import { firstValueFrom } from 'rxjs'

describe('CpfValidationService', () => {
  let service: CpfValidationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CpfValidationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should validate a known valid CPF', async () => {
    const isValid = await firstValueFrom(service.validate('529.982.247-25'))
    expect(isValid).toBe(true)
  })

  it('should reject invalid formatted CPF', async () => {
    const isValid = await firstValueFrom(service.validate('123.456.789-00'))
    expect(isValid).toBe(false)
  })

  it('should reject short CPF values', async () => {
    const isValid = await firstValueFrom(service.validate('123.456.789-0'))
    expect(isValid).toBe(false)
  })

  it('should reject CPFs with all repeating digits', async () => {
    const isValid = await firstValueFrom(service.validate('111.111.111-11'))
    expect(isValid).toBe(false)
  })
})
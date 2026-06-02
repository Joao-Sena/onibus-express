import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule]
    }).compileComponents()
  })

  it('should create sidebar', () => {
    const fixture = TestBed.createComponent(SidebarComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })

  it('should render main navigation buttons', () => {
    const fixture = TestBed.createComponent(SidebarComponent)
    fixture.detectChanges()
    const element: HTMLElement = fixture.nativeElement
    const buttons = element.querySelectorAll('button.sidebar-link')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
    expect(element.textContent).toContain('Passagens')
    expect(element.textContent).toContain('Reserva')
    expect(element.textContent).toContain('Github')
    expect(element.textContent).toContain('LinkedIn')
  })
})
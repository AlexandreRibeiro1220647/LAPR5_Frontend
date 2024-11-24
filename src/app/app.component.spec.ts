import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "SNS 27"', () => {
    expect(component.title).toBe('SNS 27');
  });

  it('should have an empty data object initially', () => {
    expect(component.data).toBeUndefined();
  });

  it('should initialize with the correct title', () => {
    component.ngOnInit();
    expect(component.title).toBe('SNS 27');
  });

  it('should render the title in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SNS 27');
  });
});

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
      ],  // Use RouterTestingModule for routing-related tests
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Detect changes to initialize the component
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();  // Check if the component instance is created
  });

  it('should have the title "SNS 27"', () => {
    expect(component.title).toBe('SNS 27');  // Verify that the title is set correctly
  });

  it('should have an empty data object initially', () => {
    expect(component.data).toBeUndefined();  // Since `data` is not initialized, expect it to be undefined
  });

  it('should initialize with the correct title', () => {
    component.ngOnInit();  // Call ngOnInit explicitly (although it's empty here)
    expect(component.title).toBe('SNS 27');  // Ensure that title is correctly set
  });

  it('should render the title in the template', () => {
    fixture.detectChanges();  // Trigger change detection to update the DOM
    const compiled = fixture.nativeElement as HTMLElement;  // Access the DOM element
    expect(compiled.querySelector('h1')?.textContent).toContain('SNS 27');  // Verify the title in the DOM
  });
});

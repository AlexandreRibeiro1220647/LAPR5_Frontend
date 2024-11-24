import { TestBed } from '@angular/core/testing';
import { UnderDevelopmentComponent } from './under-development.component';

describe('UnderDevelopmentComponent', () => {
  let component: UnderDevelopmentComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderDevelopmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the UnderDevelopment component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct message in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Under Development');
  });
});

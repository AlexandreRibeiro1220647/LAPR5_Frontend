import { TestBed } from '@angular/core/testing';
import {PrivacyPolicyComponent} from './privacy-policy.component';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Privacy Police component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct message in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Privacy Policy');
  });
});

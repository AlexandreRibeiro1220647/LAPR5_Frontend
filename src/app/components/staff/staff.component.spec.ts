import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffComponent } from './staff.component';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        StaffComponent,
        MatButton,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct route when "toOperationRequest" is called', () => {
    component.toOperationRequest();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['staff/operation-request']);
  });

  it('should navigate to the correct route when "toAppointmentSurgery" is called', () => {
    component.toAppointmentSurgery();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['staff/appointment-surgery']);
  });

  it('should navigate to the correct route when "toAllergies" is called', () => {
    component.toAllergies();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['staff/allergies']);
  });

  it('should navigate to the correct route when "toMedicalConditions" is called', () => {
    component.toMedicalConditions();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['staff/medicalConditions']);
  });

  it('should call the navigate method when a button is clicked', () => {
    spyOn(component, 'toOperationRequest');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.toOperationRequest).toHaveBeenCalled();
  });
});

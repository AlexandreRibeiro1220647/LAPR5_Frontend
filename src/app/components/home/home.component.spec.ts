import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login/login.service';
import { PatientService } from '../../services/patient/patient.service';
import { of, throwError } from 'rxjs';
import { SignUpDialogComponent } from '../dialog/login/sign-up-dialog/sign-up-dialog.component';
import { CreatePatientDTO } from '../../models/patient/createPatientDTO';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockPatientService: jasmine.SpyObj<PatientService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockLoginService = jasmine.createSpyObj('LoginService', ['authenticate', 'pollAuthStatus', 'getToken', 'getRolesFromToken', 'login', 'logout', 'signup', 'isLoggedIn']);
    mockPatientService = jasmine.createSpyObj('PatientService', ['createItem']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock MatDialogRef for the dialog.open() method
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of({
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      contactInformation: '123456789',
      email: 'johndoe@example.com',
      medicalConditions: ['None'],
      emergencyContact: '987654321',
      appointmentHistory: ['First Appointment']
    }));

    mockDialog.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule
      ], // Mock routing with RouterTestingModule
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: PatientService, useValue: mockPatientService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn on init', () => {
    mockLoginService.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call login and navigate to patient route if patient role is returned', () => {
    const mockToken = { accessToken: 'mock-token' };
    mockLoginService.authenticate.and.returnValue(of({ sessionId: '123' }));
    mockLoginService.pollAuthStatus.and.returnValue(of(true)); // Changed to return a boolean (true)
    mockLoginService.getToken.and.returnValue(of(mockToken));
    mockLoginService.getRolesFromToken.and.returnValue(['Patient']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    component.login();

    expect(mockLoginService.authenticate).toHaveBeenCalled();
    expect(mockLoginService.pollAuthStatus).toHaveBeenCalled();
    expect(mockLoginService.getToken).toHaveBeenCalledWith('123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['patient']);
  });

  it('should open sign-up dialog and sign up a new patient', () => {
    const mockCreatePatientDTO: CreatePatientDTO = {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      contactInformation: '123456789',
      email: 'johndoe@example.com',
      medicalConditions: ['None'],
      emergencyContact: '987654321',
      appointmentHistory: ['First Appointment']
    };

    const mockToken = { accessToken: 'mock-token' };

    // Mock MatDialogRef with all necessary properties (only 'afterClosed' is used in the test)
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(mockCreatePatientDTO));

    // Mock MatDialog open method to return the mockDialogRef
    mockDialog.open.and.returnValue(mockDialogRef);

    // Mock services
    mockLoginService.signup.and.returnValue(of({ sessionId: '123' }));
    mockLoginService.pollAuthStatus.and.returnValue(of(true)); // Return a boolean (true)
    mockLoginService.getToken.and.returnValue(of(mockToken));
    mockPatientService.createItem.and.returnValue(of(mockCreatePatientDTO)); // Return the expected DTO structure

    // Call the signup method
    component.signup();

    // Verify that the dialog was opened
    expect(mockDialog.open).toHaveBeenCalled();

    // Verify that signup was called
    expect(mockLoginService.signup).toHaveBeenCalled();

    // Verify that the patient service was called with the correct DTO
    expect(mockPatientService.createItem).toHaveBeenCalledWith(mockCreatePatientDTO);
  });


  it('should log out the user when logout is called', () => {
    component.logout();
    expect(mockLoginService.logout).toHaveBeenCalled();
  });

  it('should handle login error', () => {
    mockLoginService.authenticate.and.returnValue(throwError(() => new Error('Login failed')));
    spyOn(console, 'error');

    component.login();

    expect(console.error).toHaveBeenCalledWith('Login failed', jasmine.any(Error));
  });

  it('should handle sign-up error', () => {
    const mockCreatePatientDTO: CreatePatientDTO = {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      contactInformation: '923456789',
      email: 'johndoe@example.com',
      medicalConditions: ['None'],
      emergencyContact: '987654321',
      appointmentHistory: ['First Appointment']
    };

    // Mock MatDialogRef with all necessary properties
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(mockCreatePatientDTO));

    // Mock MatDialog open method to return this mocked MatDialogRef
    mockDialog.open.and.returnValue(mockDialogRef);

    // Mock the signup service to throw an error
    mockLoginService.signup.and.returnValue(throwError(() => new Error('Sign Up failed')));

    // Spy on console.error to verify the error handling
    spyOn(console, 'error');

    // Call the signup method
    component.signup();

    // Verify that the error is logged
    expect(console.error).toHaveBeenCalledWith('Sign Up failed', jasmine.any(Error));
  });

});

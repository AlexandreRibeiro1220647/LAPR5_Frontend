import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        AdminComponent,
        MatButton,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct route when "toOperationType" is called', () => {
    component.toOperationType();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin/operation-type']);
  });

  it('should navigate to the correct route when "toStaff" is called', () => {
    component.toStaff();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin/staff']);
  });

  it('should navigate to the correct route when "toPatient" is called', () => {
    component.toPatient();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin/patient']);
  });

  it('should navigate to the correct route when "toOperationRoomSchedule" is called', () => {
    component.toOperationRoomSchedule();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin/operationRoomSchedule']);
  });

  it('should call the navigate method when a button is clicked', () => {
    spyOn(component, 'toOperationType');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.toOperationType).toHaveBeenCalled();
  });
});

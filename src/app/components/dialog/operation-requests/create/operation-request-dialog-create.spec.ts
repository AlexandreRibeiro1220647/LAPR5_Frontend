import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { OperationRequestDialogCreate } from './operation-request-dialog-create';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OperationRequestService } from '../../../../services/operation-requests/operation-requests.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock Service
class MockOperationRequestService {
  getItems = jasmine.createSpy('getItems').and.returnValue(of([]));
  getPatients = jasmine.createSpy('getPatients').and.returnValue(of([]));
  getOperationTypes = jasmine.createSpy('getOperationTypes').and.returnValue(of([]));
  getStaff = jasmine.createSpy('getStaff').and.returnValue(of([]));
}

// Mock MatDialogRef
class MockMatDialogRef<T> {
  close = jasmine.createSpy('close');
}

describe('OperationRequestDialogCreate', () => {
  let component: OperationRequestDialogCreate;
  let fixture: ComponentFixture<OperationRequestDialogCreate>;
  let mockService: MockOperationRequestService;
  let mockDialogRef: MockMatDialogRef<OperationRequestDialogCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OperationRequestDialogCreate,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule 
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: OperationRequestService, useClass: MockOperationRequestService }
      ]
    }).compileComponents();

    mockService = TestBed.inject(OperationRequestService) as any;
    mockDialogRef = TestBed.inject(MatDialogRef) as any;
    fixture = TestBed.createComponent(OperationRequestDialogCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close if form is invalid on submit', () => {
    component.onSubmit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpecializationDialogEditComponent } from './specialization-dialog-edit.component';
import { SpecializationDto } from '../../../../models/staff/staff';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SpecializationDialogEditComponent', () => {
  let component: SpecializationDialogEditComponent;
  let fixture: ComponentFixture<SpecializationDialogEditComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SpecializationDialogEditComponent>>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [SpecializationDialogEditComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            specializationId: '1',
            specializationDesignation: 'Cardiology',
            specializationCode: 'CARD',
            specializationDescription: 'Specialization in Cardiology',
          } as SpecializationDto,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationDialogEditComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<SpecializationDialogEditComponent>>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data from MAT_DIALOG_DATA', () => {
    expect(component.specializationForm.value).toEqual({
      designation: 'Cardiology',
      description: 'Specialization in Cardiology',
    });
  });

  it('should close the dialog with the updated specialization data on submit', () => {
    component.specializationForm.setValue({
      designation: 'Updated Cardiology',
      description: 'Updated Description',
    });

    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      specializationId: '1',
      specializationDesignation: 'Updated Cardiology',
      specializationCode: 'CARD', // Retained from original data
      specializationDescription: 'Updated Description',
    });
  });

  it('should not close the dialog if the form is invalid', () => {
    component.specializationForm.setValue({
      designation: '', // Invalid because required
      description: '',
    });

    component.onSubmit();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});

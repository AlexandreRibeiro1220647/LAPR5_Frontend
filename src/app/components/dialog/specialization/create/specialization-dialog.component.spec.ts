import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpecializationDialogComponent } from './specialization-dialog.component';
import { CreateSpecializationDto } from '../../../../models/staff/staff';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SpecializationDialogComponent', () => {
  let component: SpecializationDialogComponent;
  let fixture: ComponentFixture<SpecializationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SpecializationDialogComponent>>;

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
      declarations: [SpecializationDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            specializationDesignation: 'Cardiology',
            specializationCode: 'CARD',
            specializationDescription: 'Specialization in Cardiology',
          } as CreateSpecializationDto,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<SpecializationDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data from MAT_DIALOG_DATA', () => {
    expect(component.specializationForm.value).toEqual({
      designation: 'Cardiology',
      code: 'CARD',
      description: 'Specialization in Cardiology',
    });
  });

  it('should close the dialog with the form data on submit', () => {
    component.specializationForm.setValue({
      designation: 'Dermatology',
      code: 'DERM',
      description: 'Specialization in Dermatology',
    });

    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      specializationDesignation: 'Dermatology',
      specializationCode: 'DERM',
      specializationDescription: 'Specialization in Dermatology',
    });
  });

  it('should not close the dialog if the form is invalid', () => {
    component.specializationForm.setValue({
      designation: '', // Invalid because required
      code: '',
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

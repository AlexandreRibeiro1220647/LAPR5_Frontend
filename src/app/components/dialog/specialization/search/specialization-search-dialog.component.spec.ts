import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpecializationSearchDialogComponent } from './specialization-search-dialog.component';
import { SearchSpecializationDto } from '../../../../models/staff/staff';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SpecializationSearchDialogComponent', () => {
  let component: SpecializationSearchDialogComponent;
  let fixture: ComponentFixture<SpecializationSearchDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SpecializationSearchDialogComponent>>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [SpecializationSearchDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationSearchDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<SpecializationSearchDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.specializationForm.value).toEqual({
      specializationDesignation: '',
      specializationCode: '',
      specializationDescription: '',
    });
  });

  it('should close the dialog with the search data on submit', () => {
    component.specializationForm.setValue({
      specializationDesignation: 'Cardiology',
      specializationCode: 'CARD',
      specializationDescription: 'Specialization in Cardiology',
    });

    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      specializationDesignation: 'Cardiology',
      specializationCode: 'CARD',
      specializationDescription: 'Specialization in Cardiology',
    });
  });

  it('should not close the dialog if the form is invalid', () => {
    component.specializationForm.setValue({
      specializationDesignation: '', // Invalid because it's optional but shouldn't be submitted empty
      specializationCode: '',
      specializationDescription: '',
    });

    component.onSubmit();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});

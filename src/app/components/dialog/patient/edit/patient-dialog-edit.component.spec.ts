import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDialogEditComponent } from './patient-dialog-edit.component';

describe('PatientDialogEditComponent', () => {
  let component: PatientDialogEditComponent;
  let fixture: ComponentFixture<PatientDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDialogEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchDialogComponent } from './patient-search-dialog.component';

describe('PatientSearchDialogComponent', () => {
  let component: PatientSearchDialogComponent;
  let fixture: ComponentFixture<PatientSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDialogEditComponent } from './staff-dialog-edit.component';

describe('StaffDialogEditComponent', () => {
  let component: StaffDialogEditComponent;
  let fixture: ComponentFixture<StaffDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDialogEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StaffDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

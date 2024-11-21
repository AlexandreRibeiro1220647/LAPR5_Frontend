import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComponente } from './staff.component';

describe('StaffComponent', () => {
  let component: StaffComponente;
  let fixture: ComponentFixture<StaffComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

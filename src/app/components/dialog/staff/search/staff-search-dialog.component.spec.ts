import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffSearchDialogComponent } from './staff-search-dialog.component';
describe('StaffSearchDialogComponent', () => {
  let component: StaffSearchDialogComponent;
  let fixture: ComponentFixture<StaffSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffSearchDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StaffSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRoomSchedulesDialogComponent } from './operation-room-schedules-dialog.component';

describe('OperationRoomSchedulesDialogComponent', () => {
  let component: OperationRoomSchedulesDialogComponent;
  let fixture: ComponentFixture<OperationRoomSchedulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRoomSchedulesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationRoomSchedulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

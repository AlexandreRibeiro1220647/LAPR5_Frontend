import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRoomSchedulesComponent } from './operation-room-schedules.component';

describe('OperationRoomSchedulesComponent', () => {
  let component: OperationRoomSchedulesComponent;
  let fixture: ComponentFixture<OperationRoomSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRoomSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationRoomSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

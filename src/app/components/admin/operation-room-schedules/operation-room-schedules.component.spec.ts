import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationRoomSchedulesComponent } from './operation-room-schedules.component';
import { AlgavService } from '../../../services/algav/algav.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { OperationRoomSchedulesDialogComponent } from '../../dialog/operation-room-schedules/operation-room-schedules-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAlgavService {
  getItems(opRoomId: string, date: string) {
    return of({
      ag_op_room_better: [['slot1', 'slot2']],
      lag_doctors_better: [[['doc1', 'doc2']]],
    });
  }
}

class MockMatDialog {
  open() {
    return {
      afterClosed: () => of({ opRoomId: 'room1', date: '2024-11-24' }),
    };
  }
}

describe('OperationRoomSchedulesComponent', () => {
  let component: OperationRoomSchedulesComponent;
  let fixture: ComponentFixture<OperationRoomSchedulesComponent>;
  let mockAlgavService: MockAlgavService;
  let mockMatDialog: MockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AlgavService, useClass: MockAlgavService },
        { provide: MatDialog, useClass: MockMatDialog },
      ],
      imports: [
        OperationRoomSchedulesComponent,
        MatButton
      ],
      schemas: [NO_ERRORS_SCHEMA], // To ignore unrecognized elements in the templates (like Material components)
    }).compileComponents();

    fixture = TestBed.createComponent(OperationRoomSchedulesComponent);
    component = fixture.componentInstance;
    mockAlgavService = TestBed.inject(AlgavService) as any;
    mockMatDialog = TestBed.inject(MatDialog) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the correct slot width', () => {
    const start = '1200';
    const finish = '1300';
    const slotWidth = component.calculateSlotWidth(start, finish);
    expect(slotWidth).toBe(6.944444444444445); // (100/1440) * (1300 - 1200) = 6.944
  });

  it('should calculate the correct slot position', () => {
    const start = '1200';
    const slotPosition = component.calculateSlotPosition(start);
    expect(slotPosition).toBe(83.33333333333334); // (100/1440) * 1200 = 83.333
  });

  it('should format the time correctly', () => {
    const formattedTime = component.formatTime('1230');
    expect(formattedTime).toBe('20:30');
  });

  it('should open the dialog and fetch schedule data', () => {
    spyOn(mockAlgavService, 'getItems').and.callThrough();
    component.openDialog();
    fixture.detectChanges();

    expect(mockAlgavService.getItems).toHaveBeenCalledWith('room1', '2024-11-24');
    expect(component.agOpRoomBetter).toEqual([['slot1', 'slot2']]);
    expect(component.lagDoctorsBetter).toEqual([[['doc1', 'doc2']]]);
  });

});

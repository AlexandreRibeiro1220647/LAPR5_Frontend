import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRequestSearchDialogComponent } from './operation-request-dialog-search';

describe('OperationRequestSearchDialogComponent', () => {
  let component: OperationRequestSearchDialogComponent;
  let fixture: ComponentFixture<OperationRequestSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRequestSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationRequestSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

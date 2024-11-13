import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRequestDialogEdit } from './operation-request-dialog-edit';
import { beforeEach, describe, it } from 'node:test';

describe('EditComponent', () => {
  let component: OperationRequestDialogEdit;
  let fixture: ComponentFixture<OperationRequestDialogEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRequestDialogEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationRequestDialogEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

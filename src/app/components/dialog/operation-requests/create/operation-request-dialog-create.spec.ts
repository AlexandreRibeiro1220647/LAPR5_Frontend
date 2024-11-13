import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRequestDialogCreate } from './operation-request-dialog-create';
import { beforeEach, describe, it } from 'node:test';

describe('CreateComponent', () => {
  let component: OperationRequestDialogCreate;
  let fixture: ComponentFixture<OperationRequestDialogCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRequestDialogCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationRequestDialogCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

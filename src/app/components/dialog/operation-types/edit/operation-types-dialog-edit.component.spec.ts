import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypesDialogEditComponent } from './operation-types-dialog-edit.component';

describe('OperationTypesDialogEditComponent', () => {
  let component: OperationTypesDialogEditComponent;
  let fixture: ComponentFixture<OperationTypesDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTypesDialogEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationTypesDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

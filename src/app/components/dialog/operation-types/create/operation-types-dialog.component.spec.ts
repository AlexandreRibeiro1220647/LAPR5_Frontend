import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypesDialogComponent } from './operation-types-dialog.component';

describe('OperationTypesDialogComponent', () => {
  let component: OperationTypesDialogComponent;
  let fixture: ComponentFixture<OperationTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTypesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

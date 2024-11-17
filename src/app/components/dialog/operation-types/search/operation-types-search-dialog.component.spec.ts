import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypesSearchDialogComponent } from './operation-types-search-dialog.component';

describe('OperationTypesSearchDialogComponent', () => {
  let component: OperationTypesSearchDialogComponent;
  let fixture: ComponentFixture<OperationTypesSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTypesSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationTypesSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

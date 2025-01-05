import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MedicalConditionsService } from '../../../services/medical-conditions/medical-conditions.service';
import { MedicalConditionDTO } from '../../../models/medical-condition/medicalConditionDTO';
import { Sort, SortDirection } from '@angular/material/sort';
import {MedicalConditionsComponent} from './medical-conditions.component';

class MockMedicalConditionsService {
  getItems = jasmine.createSpy('getItems').and.returnValue(of([]));
  updateItem = jasmine.createSpy('updateItem').and.returnValue(of({}));
  searchItems = jasmine.createSpy('searchItems').and.returnValue(of([]));
}

class MockMatDialog {
  open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(undefined),
  });
}

describe('MedicalConditionsAdminComponent', () => {
  let component: MedicalConditionsComponent;
  let fixture: ComponentFixture<MedicalConditionsComponent>;
  let mockService: MockMedicalConditionsService;
  let mockDialog: MockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MedicalConditionsComponent],
      providers: [
        { provide: MedicalConditionsService, useClass: MockMedicalConditionsService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    }).compileComponents();

    mockService = TestBed.inject(MedicalConditionsService) as any;
    mockDialog = TestBed.inject(MatDialog) as any;

    fixture = TestBed.createComponent(MedicalConditionsComponent);
    component = fixture.componentInstance;

    component.paginator = jasmine.createSpyObj('MatPaginator', ['']);
    component.sort = jasmine.createSpyObj('MatSort', ['']);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load medical conditions on init', () => {
    component.ngOnInit();
    expect(mockService.getItems).toHaveBeenCalled();
  });

  it('should open edit dialog and handle result', () => {
    const mockCondition: MedicalConditionDTO = { code: 'C1', designation: 'Diabetes', description: 'Chronic condition', commonSymptoms: ''};
    component.selection.select(mockCondition);
    component.openEditDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should toggle selection of row', () => {
    const mockCondition: MedicalConditionDTO = { code: 'C1', designation: 'Diabetes', description: 'Chronic condition', commonSymptoms: '' };
    component.toggleSelection(mockCondition);
    expect(component.selection.selected.length).toBe(1);
    component.toggleSelection(mockCondition);
    expect(component.selection.selected.length).toBe(0);
  });

  it('should announce sort change', () => {
    const sortState: Sort = {
      active: 'code',
      direction: 'asc' as SortDirection,
    };

    spyOn(component['_liveAnnouncer'], 'announce');
    component.announceSortChange(sortState);
    expect(component['_liveAnnouncer'].announce).toHaveBeenCalledWith('Sorted ascending');
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData: MedicalConditionDTO = { code: '', designation: '', description: '', commonSymptoms: '' };
    const mockFilteredData: MedicalConditionDTO[] = [
      { code: 'C1', designation: 'Diabetes', description: 'Chronic condition', commonSymptoms: '' }
    ];

    const dialogRefMock = { afterClosed: () => of(mockSearchData) } as any;

    mockDialog.open.and.returnValue(dialogRefMock);
    mockService.searchItems.and.returnValue(of(mockFilteredData));

    component.openSearchDialog();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockService.searchItems).toHaveBeenCalledWith(mockSearchData as any);
    expect(component.dataSource.data).toEqual(mockFilteredData);
  });
});

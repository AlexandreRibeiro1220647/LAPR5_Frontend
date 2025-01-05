import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AllergiesService } from '../../../services/allergies/allergies.service';
import { AllergyDTO } from '../../../models/allergy/allergyDTO';
import { SearchAllergyDTO } from '../../../models/allergy/searchAllergyDTO';
import { Sort, SortDirection } from '@angular/material/sort';
import {AllergiesComponent} from './allergies.component';

class MockAllergiesService {
  getItems = jasmine.createSpy('getItems').and.returnValue(of([]));
  updateItem = jasmine.createSpy('updateItem').and.returnValue(of({}));
  searchItems = jasmine.createSpy('searchItems').and.returnValue(of([]));
}

class MockMatDialog {
  open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(undefined),
  });
}

describe('AllergiesAdminComponent', () => {
  let component: AllergiesComponent;
  let fixture: ComponentFixture<AllergiesComponent>;
  let mockService: MockAllergiesService;
  let mockDialog: MockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, AllergiesComponent],
      providers: [
        { provide: AllergiesService, useClass: MockAllergiesService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    }).compileComponents();

    mockService = TestBed.inject(AllergiesService) as any;
    mockDialog = TestBed.inject(MatDialog) as any;

    fixture = TestBed.createComponent(AllergiesComponent);
    component = fixture.componentInstance;

    component.paginator = jasmine.createSpyObj('MatPaginator', ['']);
    component.sort = jasmine.createSpyObj('MatSort', ['']);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load allergies on init', () => {
    component.ngOnInit();
    expect(mockService.getItems).toHaveBeenCalled();
  });

  it('should open edit dialog and handle result', () => {
    const mockAllergy: AllergyDTO = { code: 'A1', designation: 'Peanut', description: 'Peanut allergy' };
    component.selection.select(mockAllergy);
    component.openEditDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });


  it('should toggle selection of row', () => {
    const mockAllergy: AllergyDTO = { code: 'A1', designation: 'Peanut', description: 'Peanut allergy' };
    component.toggleSelection(mockAllergy);
    expect(component.selection.selected.length).toBe(1);
    component.toggleSelection(mockAllergy);
    expect(component.selection.selected.length).toBe(0);
  });

  it('should announce sort change', () => {
// Define um valor válido de sortState
    const sortState: Sort = {
      active: 'code',
      direction: 'asc' as SortDirection,  // Usando 'as SortDirection' para garantir o tipo correto
    };

    spyOn(component['_liveAnnouncer'], 'announce');
    component.announceSortChange(sortState);
    expect(component['_liveAnnouncer'].announce).toHaveBeenCalledWith('Sorted ascending');
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData: SearchAllergyDTO = { code: '', designation: ''};
    const mockFilteredData: AllergyDTO[] = [
      { code: 'A1', designation: 'Peanut', description: 'Peanut allergy' }
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpecializationComponent } from './specialization.component';
import { SpecializationsService } from '../../../services/specialization/specialization.service';
import { of, throwError } from 'rxjs';
import { Specialization, SpecializationDto, CreateSpecializationDto, SearchSpecializationDto } from '../../../models/staff/staff';

describe('SpecializationComponent', () => {
  let component: SpecializationComponent;
  let fixture: ComponentFixture<SpecializationComponent>;
  let specializationServiceSpy: jasmine.SpyObj<SpecializationsService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const specializationServiceMock = jasmine.createSpyObj('SpecializationsService', [
      'getAll',
      'create',
      'update',
      'delete',
      'search',
    ]);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [SpecializationComponent],
      providers: [
        { provide: SpecializationsService, useValue: specializationServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationComponent);
    component = fixture.componentInstance;
    specializationServiceSpy = TestBed.inject(SpecializationsService) as jasmine.SpyObj<SpecializationsService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specializations on initialization', () => {
    const mockSpecializations: Specialization[] = [
      new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology'),
    ];
    specializationServiceSpy.getAll.and.returnValue(of(mockSpecializations));

    component.ngOnInit();

    expect(specializationServiceSpy.getAll).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockSpecializations);
  });

  it('should handle error when loading specializations', () => {
    specializationServiceSpy.getAll.and.returnValue(throwError(() => new Error('API error')));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(specializationServiceSpy.getAll).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error loading specializations:', jasmine.any(Error));
  });

  it('should open create dialog and handle creation', () => {
    const mockResult = new SpecializationDto('1', 'Dermatology', 'DERM', 'Specialization in Dermatology');
    const dialogRefMock = { afterClosed: () => of(mockResult) } as MatDialogRef<any>;
    dialogSpy.open.and.returnValue(dialogRefMock);

    specializationServiceSpy.create.and.returnValue(of(mockResult));

    component.openCreateDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(specializationServiceSpy.create).toHaveBeenCalledWith(new CreateSpecializationDto(mockResult.specializationDesignation, mockResult.specializationCode, mockResult.specializationDescription));
  });

  it('should open edit dialog and handle update', () => {
    const mockSelectedSpecialization = new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology');
    const mockUpdateData = new Specialization('1', 'Updated Cardiology', 'CARD-UPDATED', 'Updated Description');
    const dialogRefMock = { afterClosed: () => of(mockUpdateData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    component.selection.select(mockSelectedSpecialization);

    specializationServiceSpy.update.and.returnValue(of(mockUpdateData));

    component.openEditDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(specializationServiceSpy.update).toHaveBeenCalledWith(mockUpdateData.specializationId, mockUpdateData);
  });

  it('should delete a specialization', () => {
    const mockSelectedSpecialization = new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology');
    component.selection.select(mockSelectedSpecialization);

    specializationServiceSpy.delete.and.returnValue(of(undefined));

    component.deleteSpecialization();

    expect(specializationServiceSpy.delete).toHaveBeenCalledWith(mockSelectedSpecialization.specializationId);
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData = new SearchSpecializationDto('Cardiology', 'CARD', 'Specialization in Cardiology');
    const mockFilteredData: Specialization[] = [
      new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology'),
    ];
    const dialogRefMock = { afterClosed: () => of(mockSearchData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    specializationServiceSpy.search.and.returnValue(of(mockFilteredData));

    component.openSearchDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(specializationServiceSpy.search).toHaveBeenCalledWith(mockSearchData);
    expect(component.dataSource.data).toEqual(mockFilteredData);
  });
});

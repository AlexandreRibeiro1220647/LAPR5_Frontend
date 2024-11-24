import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationTypesDialogComponent } from './operation-types-dialog.component';
import { CreateOperationTypeDTO } from '../../../../models/operation-types/createOperationTypeDTO';

describe('OperationTypesDialogComponent', () => {
  let component: OperationTypesDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OperationTypesDialogComponent>>;

  beforeEach(() => {
    // Mock do MatDialogRef
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    // Criar uma instância do componente
    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OperationTypesDialogComponent>>;
    component = new OperationTypesDialogComponent(fb, dialogRefSpy);
  });

  it('deve inicializar o formulário com campos vazios', () => {
    expect(component.operationForm).toBeDefined();
    expect(component.operationForm.value).toEqual({
      name: '',
      requiredStaffBySpecialization: '',
      estimatedDuration: '',
    });
  });

  it('deve chamar dialogRef.close ao cancelar', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('deve enviar os dados convertidos ao submeter formulário válido', () => {
    // Configurar valores válidos no formulário
    component.operationForm.setValue({
      name: 'Operation A',
      requiredStaffBySpecialization: 'Doctor, Nurse',
      estimatedDuration: '2h, 30m',
    });

    component.onSubmit();

    const expectedData: CreateOperationTypeDTO = {
      name: 'Operation A',
      requiredStaffBySpecialization: ['Doctor', 'Nurse'],
      estimatedDuration: ['2h', '30m'],
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });
});

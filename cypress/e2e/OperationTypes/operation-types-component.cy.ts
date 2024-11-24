describe('OperationTypeComponent', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('button.login_button').click();

    cy.pause();

    cy.get('.vertical-buttons button').eq(0).click();
  });

  it('should load operation types into the table', () => {
    cy.get('table.mat-table').should('exist');
    cy.get('tr').should('have.length.at.least', 2);
  });

  it('should open create dialog and submit data', () => {
    cy.get('button.create-button').click();

    cy.get('mat-dialog-container').should('be.visible');

    cy.get('input[formControlName="name"]').type('Test Operation', { force: true });
    cy.get('input[formControlName="requiredStaffBySpecialization"]').type('1 Doctor, 2 Nurse', { force: true });
    cy.get('input[formControlName="estimatedDuration"]').type('01:00:00, 00:10:00, 02:00:00', { force: true });

    cy.get('button.Submit').click({ force: true });


    cy.wait(5000);

    cy.reload();

    cy.get('.mat-mdc-paginator-navigation-last').click();

    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("Test Operation");
    });
  });

  it('should open edit dialog and update data', () => {
    cy.get('.mat-mdc-paginator-navigation-last').click();
    cy.get('tr').contains('Test Operation').click();
    cy.get('button.edit-button').click();

    cy.get('mat-dialog-container').should('be.visible');

    cy.get('input[formControlName="requiredStaffBySpecialization"]').type('3 Doctor, 2 Nurse', { force: true });

    cy.get('button.Submit').click({ force: true });

    cy.wait(5000);

    cy.reload();


    cy.get('.mat-mdc-paginator-navigation-last').click();

    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("Test Operation");
    });
  });

  it('should inactivate the selected operation', () => {
    cy.get('.mat-mdc-paginator-navigation-last').click();
    cy.get('tr').contains('Test Operation').click();
    cy.get('button.delete-button').click();

    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("Test Operation");
      cy.contains("No");
    });
  });

  it('should open search dialog and filter results', () => {
    cy.get('button.search-button').click();

    cy.get('mat-dialog-container').should('be.visible');

    cy.get('input[formControlName="name"]').type('Test Operation');

    cy.get('button.Submit').click({ force: true });

    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("Test Operation");
    });
  });
});

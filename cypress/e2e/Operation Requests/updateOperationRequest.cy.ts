describe('Staff Component E2E Tests', () => {


it('should open the edit dialog and update a request', () => {
    cy.visit('/');
    cy.get('button.login_button').click();

    // Pausar para login manual
    cy.pause();



    cy.get('tr[mat-row]').first().click({force: true});            

    cy.get('button.edit-button').click();
    cy.get('mat-dialog-container').should('be.visible');


    cy.get('[formControlName="priority"]').click();
    cy.get('mat-option').contains('Emergency').click();

    cy.get('[formControlName="deadline"]').type('2024-12-31');
    cy.get('button').contains('Update').click();

    cy.reload();

    cy.get('tr[mat-row]').first().within(() => {
        cy.get('td').eq(3).should('contain', 'EMERGENCY'); // Coluna 'Priority'
        cy.get('td').eq(4).should('contain', '31/12/2024'); // Coluna 'Deadline'
      });

})
})


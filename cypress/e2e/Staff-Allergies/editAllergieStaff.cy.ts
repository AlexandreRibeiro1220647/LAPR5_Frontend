describe('Staff Allergies Component E2E Tests', () => {

    it('should open the edit dialog and update an allergy', () => {
  
        cy.visit('/');

        cy.get('button.login_button').click();

        cy.pause();

        cy.get('button.right-button').contains('Allergies').click();

        cy.url().should('include', '/allergies');

        cy.get('tr[mat-row]').first().click({ force: true });

        cy.get('button.edit-button').click();

        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain', 'Allergy'); // Verificar o título do modal

        cy.get('[formControlName="designation"]').click({ force: true }).clear({ force: true }).type('Peanut Allergy 33', { force: true });
        cy.get('[formControlName="description"]').click({ force: true }).clear({ force: true }).type('hypersensitivity to peanuts causing reactions like hives, swelling, or anaphylaxis. - true', { force: true });


        cy.get('button.Submit').click();

        cy.reload();
        cy.get('tr[mat-row]').first().within(() => {
            cy.get('td').eq(1).should('contain', 'Peanut Allergy 33'); // Verificar coluna "Designation"
            cy.get('td').eq(2).should('contain', 'hypersensitivity to peanuts causing reactions like hives, swelling, or anaphylaxis. - true'); // Verificar coluna "Description"
        });
    });

});

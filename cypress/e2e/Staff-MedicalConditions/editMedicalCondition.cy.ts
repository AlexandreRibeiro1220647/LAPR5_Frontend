describe('Staff Allergies Component E2E Tests', () => {

    it('should open the edit dialog and update a medical Condition', () => {

        cy.visit('/');

        cy.get('button.login_button').click();


        cy.pause();


        cy.get('button.right-button').contains('MedicalConditions').click();


        cy.url().should('include', '/medicalConditions');

        cy.get('tr[mat-row]').first().click({ force: true });


        cy.get('button.edit-button').click();


        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain', 'Medical Conditon'); // Verificar o título do modal


        cy.get('[formControlName="designation"]').click({ force: true }).clear({ force: true }).type('Cholera 12', { force: true });
        cy.get('[formControlName="description"]').click({ force: true }).clear({ force: true }).type('acute diarrheal infection from vibrio cholerae bacteria. - true', { force: true });


        cy.get('button.Submit').click();


        cy.reload();
        cy.get('tr[mat-row]').first().within(() => {
            cy.get('td').eq(1).should('contain', 'Cholera 12'); // Verificar coluna "Designation"
            cy.get('td').eq(2).should('contain', 'acute diarrheal infection from vibrio cholerae bacteria. - true'); // Verificar coluna "Description"
        });
    });

});

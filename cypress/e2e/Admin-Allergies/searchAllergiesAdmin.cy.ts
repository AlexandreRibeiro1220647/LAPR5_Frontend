describe('Admin Allergies Component E2E Tests', () => {

    it('should open the edit dialog and search an allergy for code', () => {

        cy.visit('/');


        cy.get('button.login_button').click();

        cy.pause();

        cy.get('button.right-button').contains('Allergies').click();

        cy.url().should('include', '/allergies');

        cy.get('tr[mat-row]').first().click({ force: true });

        cy.get('button.search-button').click();

        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain', 'Search Allergies'); // Verificar o título do modal


        cy.get('[formControlName="code"]').click({ force: true }).clear({ force: true }).type('3', { force: true });
       // cy.get('[formControlName="description"]').click({ force: true }).clear({ force: true }).type('hypersensitivity to peanuts causing reactions like hives, swelling, or anaphylaxis. - true', { force: true });

       cy.get('mat-dialog-container').within(() => {
        cy.contains('button', 'Search').click({ force: true });
      });

    cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("3");
      cy.contains("Milk Allergy");
      cy.contains("immune reaction to milk proteins, often causing digestive issues or skin rashes. ");
    });
    });

    it('should open the search dialog and search a medical Condition for designation', () => {

        cy.visit('/');


        cy.get('button.login_button').click();


        cy.pause();

        cy.get('button.right-button').contains('Allergies').click();

        cy.url().should('include', '/allergies');


        cy.get('tr[mat-row]').first().click({ force: true });

        cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();

        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain','Search Allergies'); // Verificar o título do modal


        cy.get('[formControlName="designation"]').click({ force: true }).clear({ force: true }).type('Egg Allergy', { force: true });

        cy.get('mat-dialog-container').within(() => {
            cy.contains('button', 'Search').click({ force: true });
          });

        cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('table.mat-table tbody tr').first().within(() => {
          cy.contains("4");
          cy.contains("Egg Allergy");
          cy.contains("allergic reaction to egg proteins, causing skin, respiratory, or gastrointestinal symptoms. ");
        });
    });


    it('should cancel the search dialog', () => {

      cy.visit('/');


      cy.get('button.login_button').click();


      cy.pause();


      cy.get('button.right-button').contains('Allergies').click();


      cy.url().should('include', '/allergies');

      cy.get('tr[mat-row]').first().click({ force: true });

      cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();

        cy.get('mat-dialog-container').within(() => {
            cy.contains('button', 'Cancel').click({ force: true });
          });

      cy.get('h2[mat-dialog-title]').should('not.exist');
    });

});

describe('Admin Medical Conditions Component E2E Tests', () => {

    it('should open the search dialog and search a medical Condition for code', () => {

        cy.visit('/');


        cy.get('button.login_button').click();

        cy.pause();

        cy.get('button.right-button').contains('Medical Conditions').click();

        cy.url().should('include', '/medicalConditions');

        cy.get('tr[mat-row]').first().click({ force: true });

        cy.get('button.search-button').click();

        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain', 'Search Medical Conditions'); // Verificar o título do modal


        cy.get('[formControlName="code"]').click({ force: true }).clear({ force: true }).type('B50', { force: true });
       // cy.get('[formControlName="description"]').click({ force: true }).clear({ force: true }).type('hypersensitivity to peanuts causing reactions like hives, swelling, or anaphylaxis. - true', { force: true });

       cy.get('mat-dialog-container').within(() => {
        cy.contains('button', 'Search').click({ force: true });
      });

    cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('table.mat-table tbody tr').first().within(() => {
      cy.contains("B50");
      cy.contains("Plasmodium falciparum malaria");
      cy.contains("severe malaria caused by plasmodium falciparum parasite");
      cy.contains("fever, chills, anemia, organ failure")
    });
    });

    it('should open the search dialog and search a medical condition for designation', () => {

        cy.visit('/');


        cy.get('button.login_button').click();


        cy.pause();

        cy.get('button.right-button').contains('Medical Conditions').click();

        cy.url().should('include', '/medicalConditions');


        cy.get('tr[mat-row]').first().click({ force: true });

        cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();

        cy.get('mat-dialog-container').should('be.visible');
        cy.get('h2[mat-dialog-title]').should('contain','Search Medical Conditions'); // Verificar o título do modal


        cy.get('[formControlName="designation"]').click({ force: true }).clear({ force: true }).type('Malignant neoplasm of lung', { force: true });

        cy.get('mat-dialog-container').within(() => {
            cy.contains('button', 'Search').click({ force: true });
          });

        cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('table.mat-table tbody tr').first().within(() => {
          cy.contains("2A20.0");
          cy.contains("Malignant neoplasm of lung ");
          cy.contains("cancer originating in lung tissues");
          cy.contains("persistent cough, chest pain, weight loss")
        });
    });


    it('should cancel the search dialog', () => {

      cy.visit('/');


      cy.get('button.login_button').click();


      cy.pause();


      cy.get('button.right-button').contains('Medical Conditions').click();


      cy.url().should('include', '/medicalConditions');

      cy.get('tr[mat-row]').first().click({ force: true });

      cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();

        cy.get('mat-dialog-container').within(() => {
            cy.contains('button', 'Cancel').click({ force: true });
          });

      cy.get('h2[mat-dialog-title]').should('not.exist');
    });

});

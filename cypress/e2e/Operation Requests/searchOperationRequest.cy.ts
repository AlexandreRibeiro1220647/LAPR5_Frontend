describe('Search Operation Type Dialog', () => {
  
    it('should search correctly', () => {
        cy.visit('/');
        cy.get('button.login_button').click();
    
        // Pausar para login manual
        cy.pause();
       
        cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();
  
      cy.get('h2[mat-dialog-title]').should('contain', 'Search Operation Request').and('be.visible');
      
      cy.get('input[formControlName="patientName"]').type('André Silva');
     // cy.get('input[formControlName="patientId"]').type('');
    //  cy.get('input[formControlName="operationTypeId"]').type('');
    //  cy.get('mat-select[formControlName="priority"]').click();
   //   cy.get('mat-option').contains('Urgent').click();
   //   cy.get('input[formControlName="deadline"]').type('');
  
   cy.get('mat-dialog-container').within(() => {
    cy.contains('button', 'Search').click({ force: true });
  });
  
      cy.get('h2[mat-dialog-title]').should('not.exist');
  
      
      cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('table.mat-table tbody tr').first().within(() => {
          cy.contains("André Silva");
          cy.contains("Sofia Oliveira");
          cy.contains("Trigger finger");
          cy.contains("URGENT");
          cy.contains("31/12/2024");
          
        });
    });
  
    it('should cancel the search dialog', () => {
      
        cy.visit('/');
        cy.get('button.login_button').click();
    
        // Pausar para login manual
        cy.pause();
       
        cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();
  
        cy.get('mat-dialog-container').within(() => {
            cy.contains('button', 'Cancel').click({ force: true });
          });
  
      cy.get('h2[mat-dialog-title]').should('not.exist');
    });

    it('should show empty table', () => {

        cy.visit('/');
        cy.get('button.login_button').click();
    
    
        cy.pause();
       
        cy.get('button.search-button', { timeout: 10000 }).should('be.visible').click();
  
      cy.get('h2[mat-dialog-title]').should('contain', 'Search Operation Request').and('be.visible');
      
     // cy.get('input[formControlName="patientName"]').type('André Silva');
     // cy.get('input[formControlName="patientId"]').type('');
    //  cy.get('input[formControlName="operationTypeId"]').type('');
      cy.get('mat-select[formControlName="priority"]').click();
      cy.get('mat-option').contains('Emergency').click();
   //   cy.get('input[formControlName="deadline"]').type('');
  
   cy.get('mat-dialog-container').within(() => {
    cy.contains('button', 'Search').click({ force: true });
  });
  
      cy.get('h2[mat-dialog-title]').should('not.exist');
  
      
      cy.get('tr[mat-row]').should('have.length.lessThan', 1);

    });


  });
  
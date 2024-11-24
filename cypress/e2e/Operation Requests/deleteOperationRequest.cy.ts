describe('Staff Component E2E Tests - Delete', () => {


    it('should not delete if no row is selected', () => {
        
        cy.visit('/');
        cy.get('button.login_button').click();
    
        // Pausar para login manual
        cy.pause();
        
         
     cy.get('button.delete-button').should('be.visible').click();
     cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Please select a row to perform the action.')})

    // Aguarde a tabela atualizar e verifique que a linha foi removida
        cy.reload();
        
        cy.get('tr[mat-row]').should('have.length.greaterThan', 0);
  
      });

    it('should delete a selected operation request', () => {
  
    cy.visit('/');
    cy.get('button.login_button').click();

    // Pausar para login manual
    cy.pause();
    
    cy.get('tr[mat-row]').should('have.length.greaterThan', 0);
  
   
   cy.get('tr[mat-row]').first().click({ force: true });
  
  
   cy.get('button.delete-button').click();


   cy.reload();


   cy.get('tr[mat-row]').should('have.length.lessThan', 1);
    });

  });
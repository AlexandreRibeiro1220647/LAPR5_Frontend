
describe('Create Operation Request', () => {
  

 /* beforeEach(() => {
    cy.visit('/')
    cy.get('button.login_button').click();

});
*/
    
    it('Should open the create dialog and add a new operation request', () => {
     // cy.visit('/staff'); // Ajuste conforme o caminho da aplicação
      cy.visit('/');
      cy.get('button.login_button').click();
  

      // Pausar para permitir o login manual
      cy.pause();

      // Abrir o modal de criação
      cy.get('button.create-button', { timeout: 10000 }).should('be.visible').click();
  
      // Preencher o formulário
      cy.get('input[formControlName="patientEmail"]').type('patient@example.com');
      cy.get('input[formControlName="doctorEmail"]').type('doctor@example.com');
      cy.get('input[formControlName="operationTypeName"]').type('Operation Type 1');
      cy.get('input[formControlName="deadline"]').type('2024-12-31');
      cy.get('mat-select[formControlName="priority"]').click();
      cy.get('mat-option').contains('Urgent').click();
  
      // Submeter
      cy.get('button[type="submit"]').click();
  
      // Verificar se o item foi adicionado
      cy.get('table.mat-table tbody tr').should('contain', 'patient@example.com');
    });
  });
  
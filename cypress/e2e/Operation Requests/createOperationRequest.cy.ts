
describe('Create Operation Request', () => {
  
    
    it('Should open the create dialog and try to add a new operation request but get an alert because patient doesnt exist', () => {
     // cy.visit('/staff'); // Ajuste conforme o caminho da aplicação
      cy.visit('/');
      cy.get('button.login_button').click();
  

      // Pausar para permitir o login manual
      cy.pause();

      // Abrir o modal de criação
      cy.get('button.create-button', { timeout: 10000 }).should('be.visible').click();
  
      // Preencher o formulário
      cy.get('input[formControlName="patientEmail"]').type('patient@example.com');
      cy.get('input[formControlName="doctorEmail"]').type('doctor@example.com', { force: true });
      cy.get('input[formControlName="operationTypeName"]').type('op1', {force: true});
      cy.get('input[formControlName="deadline"]').type('2024-12-31');
      cy.get('mat-select[formControlName="priority"]').click();
      cy.get('mat-option').contains('Urgent').click();
  
      // Submeter
      cy.get('mat-dialog-container').within(() => {
        cy.contains('button', 'Create').click({ force: true });
      });

      cy.on('window:alert', (text) => {
        expect(text).to.equal('Patient with email "patient@example.com" not found.'); // Replace with the actual alert message
    });
    });

    it('Should open the create dialog and successfully add a new operation request', () => {
        cy.visit('/');
        cy.get('button.login_button').click();
    
        // Pausar para login manual
        cy.pause();
    
        // Abrir o modal de criação
        cy.get('button.create-button', { timeout: 10000 }).should('be.visible').click();
    
        // Preencher o formulário com dados válidos
        const patientEmail = 'joaopaulo123@gmail.com';
        const doctorEmail = 'alexandre@gmail.com';
        const operationType = 'Knee Replacement';
        const deadline = '2024-12-31';
        const priority = 'Urgent';
    
        cy.get('input[formControlName="patientEmail"]').type(patientEmail);
        cy.get('input[formControlName="doctorEmail"]').type(doctorEmail, { force: true });
        cy.get('input[formControlName="operationTypeName"]').type(operationType, { force: true });
        cy.get('input[formControlName="deadline"]').type(deadline);
        cy.get('mat-select[formControlName="priority"]').click();
        cy.get('mat-option').contains(priority).click();
    
        // Submeter
        cy.get('mat-dialog-container').within(() => {
          cy.contains('button', 'Create').click({ force: true });
        });
    
        cy.reload();

        cy.get('table.mat-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('table.mat-table tbody tr').first().within(() => {
          cy.contains("João Paulo");
          cy.contains("Alexandre Ribeiro");
          cy.contains(operationType);
          cy.contains(priority.toUpperCase());
          cy.contains("31/12/2024");
          
        });
      
  });
})
  
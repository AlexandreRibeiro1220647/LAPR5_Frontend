describe('Load Operation Requests Table', () => {
  beforeEach(() => {
    cy.visit('/staff')
    });
  it('Should display a list of operation requests', () => {
    cy.visit('/'); // Substitua pelo caminho da sua aplicação
    cy.get('table.mat-table').should('exist'); // Verifica se a tabela está presente
    cy.get('table.mat-table tbody tr').should('have.length.greaterThan', 0); // Verifica se há linhas na tabela
  });
});
describe('Under Development Page Tests', () => {
  beforeEach(() => {
    cy.visit('/under-dev');
  });

  it('should display the overlay with the correct message', () => {
    cy.get('.overlay').should('exist').and('be.visible');

    cy.get('.message-container').should('exist').and('be.visible');

    cy.get('.message-container h1').should('contain.text', 'Page Under Development');

    cy.get('.message-container p').should(
      'contain.text',
      'We’re working hard to get this page ready for you. Check back soon!'
    );
  });

  it('should ensure proper styling of the message', () => {
    cy.get('.message-container h1').should('have.css', 'font-size').and('match', /px/); // Check font size in px
    cy.get('.message-container p').should('have.css', 'text-align', 'center'); // Centered text
  });

  it('should not allow interaction behind the overlay', () => {
    cy.get('body').click('topLeft');

    cy.get('.overlay').should('be.visible');
  });
});

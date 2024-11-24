describe('Under Development Page Tests', () => {
  beforeEach(() => {
    // Visit the under-development page
    cy.visit('/under-dev'); // Adjust the URL to the correct route for this page
  });

  it('should display the overlay with the correct message', () => {
    // Check that the overlay exists
    cy.get('.overlay').should('exist').and('be.visible');

    // Verify the message container within the overlay
    cy.get('.message-container').should('exist').and('be.visible');

    // Check the heading text
    cy.get('.message-container h1').should('contain.text', 'Page Under Development');

    // Check the paragraph text
    cy.get('.message-container p').should(
      'contain.text',
      'We’re working hard to get this page ready for you. Check back soon!'
    );
  });

  it('should ensure proper styling of the message', () => {
    // Verify that the message container is styled correctly
    cy.get('.message-container h1').should('have.css', 'font-size').and('match', /px/); // Check font size in px
    cy.get('.message-container p').should('have.css', 'text-align', 'center'); // Centered text
  });

  it('should not allow interaction behind the overlay', () => {
    // Simulate clicking on an element behind the overlay (if any exist in the DOM)
    cy.get('body').click('topLeft'); // Click somewhere on the page

    // Ensure the overlay is still visible and active
    cy.get('.overlay').should('be.visible');
  });
});

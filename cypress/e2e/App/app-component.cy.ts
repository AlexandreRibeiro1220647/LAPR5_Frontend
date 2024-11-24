describe('SNS 27 Page Tests', () => {
  beforeEach(() => {
    // Visit the root page before each test
    cy.visit('/');
  });

  it('should display the logo and header correctly', () => {
    // Check the hospital logo is displayed
    cy.get('.logo-img').first().should('have.attr', 'src', 'hospital_logo.png');
    cy.contains('h1', 'SNS 27').should('be.visible');

    // Verify header navigation links
    cy.get('nav ul li').should('have.length', 4); // Check there are 4 links
    cy.contains('Home').should('have.attr', 'href', '');
    cy.contains('About').should('have.attr', 'href', 'under-dev');
    cy.contains('Services').should('have.attr', 'href', 'under-dev');
    cy.contains('Contact').should('have.attr', 'href', 'under-dev');
  });

  it('should load the router-outlet (main content)', () => {
    // Ensure the main section with router-outlet is present
    cy.get('main router-outlet').should('exist');
  });

  it('should display footer content correctly', () => {
    // Check copyright text
    cy.contains('footer', '© 2024 SNS 27. All rights reserved.').should('be.visible');

    // Check the SNS logo
    cy.get('.snsphotos .logo-img')
      .should('have.attr', 'src', 'logo_SNS_cor_branco.png')
      .and('have.attr', 'alt', 'Logo SNS');

    // Verify footer links
    cy.get('.footer-links ul li').should('have.length', 2); // Check there are 2 links
    cy.contains('Privacy Policy').should('have.attr', 'href', 'under-dev');
    cy.contains('Terms of Service').should('have.attr', 'href', 'under-dev');
  });

  it('should navigate to "under-dev" when footer links are clicked', () => {
    cy.contains('Privacy Policy').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/'); // Go back to the main page
    cy.contains('Terms of Service').click();
    cy.url().should('include', '/under-dev');
  });

  it('should navigate to "under-dev" when header links are clicked', () => {
    cy.contains('About').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/'); // Return to main page
    cy.contains('Services').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/'); // Return to main page
    cy.contains('Contact').click();
    cy.url().should('include', '/under-dev');
  });
});

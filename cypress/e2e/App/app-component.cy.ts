describe('SNS 27 Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the logo and header correctly', () => {
    cy.get('.logo-img').first().should('have.attr', 'src', 'hospital_logo.png');
    cy.contains('h1', 'SNS 27').should('be.visible');

    cy.get('nav ul li').should('have.length', 4);
    cy.contains('Home').should('have.attr', 'href', '');
    cy.contains('About').should('have.attr', 'href', 'under-dev');
    cy.contains('Services').should('have.attr', 'href', 'under-dev');
    cy.contains('Contact').should('have.attr', 'href', 'under-dev');
  });

  it('should load the router-outlet (main content)', () => {
    cy.get('main router-outlet').should('exist');
  });

  it('should display footer content correctly', () => {
    cy.contains('footer', '© 2024 SNS 27. All rights reserved.').should('be.visible');

    cy.get('.snsphotos .logo-img')
      .should('have.attr', 'src', 'logo_SNS_cor_branco.png')
      .and('have.attr', 'alt', 'Logo SNS');

    cy.get('.footer-links ul li').should('have.length', 2);
    cy.contains('Privacy Policy').should('have.attr', 'href', 'under-dev');
    cy.contains('Terms of Service').should('have.attr', 'href', 'under-dev');
  });

  it('should navigate to "under-dev" when footer links are clicked', () => {
    cy.contains('Privacy Policy').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/');
    cy.contains('Terms of Service').click();
    cy.url().should('include', '/under-dev');
  });

  it('should navigate to "under-dev" when header links are clicked', () => {
    cy.contains('About').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/');
    cy.contains('Services').click();
    cy.url().should('include', '/under-dev');

    cy.visit('/');
    cy.contains('Contact').click();
    cy.url().should('include', '/under-dev');
  });
});

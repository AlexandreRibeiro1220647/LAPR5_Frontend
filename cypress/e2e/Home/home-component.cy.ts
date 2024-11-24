describe('HomeComponent E2E Tests', () => {
  const baseUrl = 'http://localhost:4200';

  beforeEach(() => {
    cy.visit(`${baseUrl}`);
  });

  it('should display "Login" and "Sign up" buttons when not logged in', () => {
    cy.get('.login_button').should('be.visible');
    cy.get('.sign_up_button').should('be.visible');
    cy.get('.logout_button').should('not.exist');
  });

  it('should display "Logout" button when logged in', () => {
    // Simulate login
    window.sessionStorage.setItem('isLoggedIn', 'true');
    cy.visit(`${baseUrl}`);

    cy.get('.logout_button').should('be.visible');
    cy.get('.login_button').should('not.exist');
    cy.get('.sign_up_button').should('not.exist');
  });

  it('should navigate correctly when "Login" is clicked', () => {
    cy.intercept('POST', '/api/login', {
      body: { sessionId: 'mockSessionId' },
    });

    cy.intercept('GET', '/api/get-token/mockSessionId', {
      body: { accessToken: 'mockAccessToken' },
    });

    cy.intercept('GET', '/api/roles', {
      body: ['Admin'],
    });

    cy.get('.login_button').click();

    cy.pause();

    cy.url().should('include', '/admin');
  });

  it('should logout when the "Logout" button is clicked', () => {
    window.sessionStorage.setItem('isLoggedIn', 'true');
    cy.visit(`${baseUrl}`);

    cy.get('.logout_button').click();

    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('isLoggedIn')).to.equal('false');
    });

    cy.visit(`${baseUrl}`);

    cy.get('.login_button').should('be.visible');
    cy.get('.sign_up_button').should('be.visible');
    cy.get('.logout_button').should('not.exist');
  });

  it('should open the signup dialog when "Sign up" is clicked', () => {
    cy.get('.sign_up_button').click();

    cy.get('mat-dialog-container').should('be.visible');

    cy.get('input[formControlName="fullName"]').type('John Doe', { force: true });
    cy.get('input[formControlName="dateOfBirth"]').type('12/12/2000', { force: true });
    cy.get('input[formControlName="gender"]').type('Male', { force: true });
    cy.get('input[formControlName="contactInformation"]').type('911211211', { force: true });
    cy.get('input[formControlName="email"]').type('john.doe@example.com', { force: true });
    cy.get('input[formControlName="medicalConditions"]').type('Hypertension', { force: true });
    cy.get('input[formControlName="emergencyContact"]').type('912922922', { force: true });
    cy.get('input[formControlName="appointmentHistory"]').type('Routine check-up in 2023', { force: true });

    cy.get('.submit').click();

    cy.get('mat-dialog-container').should('not.exist');
  });

});

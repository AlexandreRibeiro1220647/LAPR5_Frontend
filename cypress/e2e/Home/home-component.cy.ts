describe('HomeComponent E2E Tests', () => {
  const baseUrl = 'http://localhost:4200'; // Replace with the actual URL if different

  beforeEach(() => {
    cy.visit(`${baseUrl}`); // Adjust the route if your home component is at a different path
  });

  it('should display "Login" and "Sign up" buttons when not logged in', () => {
    cy.get('.login_button').should('be.visible'); // Verify "Login" button
    cy.get('.sign_up_button').should('be.visible'); // Verify "Sign up" button
    cy.get('.logout_button').should('not.exist'); // Verify "Logout" button is not visible
  });

  it('should display "Logout" button when logged in', () => {
    // Simulate login
    window.sessionStorage.setItem('isLoggedIn', 'true');
    cy.visit(`${baseUrl}`); // Refresh page to apply session changes

    cy.get('.logout_button').should('be.visible'); // Verify "Logout" button
    cy.get('.login_button').should('not.exist'); // Verify "Login" button is not visible
    cy.get('.sign_up_button').should('not.exist'); // Verify "Sign up" button is not visible
  });

  it('should navigate correctly when "Login" is clicked', () => {
    // Mock server response for login
    cy.intercept('POST', '/api/login', {
      body: { sessionId: 'mockSessionId' },
    });

    cy.intercept('GET', '/api/get-token/mockSessionId', {
      body: { accessToken: 'mockAccessToken' },
    });

    cy.intercept('GET', '/api/roles', {
      body: ['Admin'], // Mock user role
    });

    // Click the login button
    cy.get('.login_button').click();

    cy.pause();

    // Assert navigation to the admin dashboard
    cy.url().should('include', '/admin');
  });

  it('should logout when the "Logout" button is clicked', () => {
    // Simulate login
    window.sessionStorage.setItem('isLoggedIn', 'true');
    cy.visit(`${baseUrl}`); // Refresh page to apply session changes

    // Click the logout button
    cy.get('.logout_button').click();

    // Verify session storage is cleared
    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('isLoggedIn')).to.equal('false');
    });

    cy.visit(`${baseUrl}`); // Refresh page to apply session changes

    // Verify the page is updated
    cy.get('.login_button').should('be.visible');
    cy.get('.sign_up_button').should('be.visible');
    cy.get('.logout_button').should('not.exist');
  });

  it('should open the signup dialog when "Sign up" is clicked', () => {
    // Intercept the dialog open event
    cy.get('.sign_up_button').click();

    // Verify that the dialog is visible
    cy.get('mat-dialog-container').should('be.visible');

    // Fill out the "Full Name" field
    cy.get('input[formControlName="fullName"]').type('John Doe', { force: true });
    // Fill out the "Date of Birth" field
    cy.get('input[formControlName="dateOfBirth"]').type('12/12/2000', { force: true });
    // Fill out the "Gender" field
    cy.get('input[formControlName="gender"]').type('Male', { force: true });
    // Fill out the "Contact Information" field
    cy.get('input[formControlName="contactInformation"]').type('911211211', { force: true });
    // Fill out the "Email" field
    cy.get('input[formControlName="email"]').type('john.doe@example.com', { force: true });
    // Fill out the "Medical Conditions" field
    cy.get('input[formControlName="medicalConditions"]').type('Hypertension', { force: true });
    // Fill out the "Emergency Contact" field
    cy.get('input[formControlName="emergencyContact"]').type('912922922', { force: true });
    // Fill out the "Appointment History" field
    cy.get('input[formControlName="appointmentHistory"]').type('Routine check-up in 2023', { force: true });

    // Submit the form
    cy.get('.submit').click();

    // Verify the user is redirected or the dialog is closed
    cy.get('mat-dialog-container').should('not.exist');
  });

});

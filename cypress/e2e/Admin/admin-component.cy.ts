describe('AdminComponent E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should navigate to Operation Type page when "Operation Type" button is clicked', () => {
    cy.get('.vertical-buttons button').eq(0).click();
    cy.url().should('include', '/admin/operation-type');
  });

  it('should navigate to Staff page when "Staff" button is clicked', () => {
    cy.get('.vertical-buttons button').eq(1).click();
    cy.url().should('include', '/admin/staff');
  });

  it('should navigate to Patient page when "Patient" button is clicked', () => {
    cy.get('.vertical-buttons button').eq(2).click();
    cy.url().should('include', '/admin/patient');
  });

  it('should navigate to Operation Room Schedule page when "Operation Room Schedule" button is clicked', () => {
    cy.get('.vertical-buttons button').eq(3).click();
    cy.url().should('include', '/admin/operationRoomSchedule');
  });
});

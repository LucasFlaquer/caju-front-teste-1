/// <reference types="cypress" />

describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/registrations', {
      statusCode: 200,
      fixture: 'registrations.json',
    }).as('registrations')
    cy.intercept('GET', '**/registrations?cpf=**', {
      statusCode: 200,
      fixture: 'registrations-by-cpf.json',
    }).as('registrationsByCpf')
    cy.intercept('PUT', '**/registrations/**', {
      statusCode: 200,
    }).as('updateRegistrations')
    cy.intercept('DELETE', '**/registrations/**', {
      statusCode: 200,
    }).as('deleteRegistrations')
    cy.visit('http://localhost:3001/#/dashboard')
    cy.viewport(1920, 980)
    cy.wait('@registrations')
  })
  it('should be able to list the registrations in the dashboard', () => {
    cy.get('h1').contains('Caju Front Teste').should('be.visible')
    cy.get('[data-testid="registration-card"]').should('have.length', 3)
  })
  it('should be able to list approve an registration in review', () => {
    cy.get('[data-testid="collumn-REVIEW"] [data-testid="registration-card"]')
      .first()
      .get('button')
      .contains('Aprovar')
      .click()
    cy.get('button').contains('Confirmar').click()
    cy.get(
      '[data-testid="collumn-REVIEW"] [data-testid="registration-card"]',
    ).should('have.length', 0)
  })
  it('should be able to delete a registration', () => {
    cy.get('[data-testid="collumn-APPROVED"]')
      .find('[data-testid="registration-card"]')
      .first()
      .find('[data-testid="delete-button"]')
      .click()

    cy.get('button').contains('Confirmar').click()
    cy.get('[data-testid="collumn-APPROVED"]')
      .find('[data-testid="registration-card"]')
      .should('have.length', 0)
  })
  it('should be able to filter registrations by CPF', () => {
    const cpfField = cy.get('#cpf')
    cpfField.type('56642105087')
    cy.get('[data-testid="registration-card"]').should('have.length', 1)
    cpfField.should('not.have.value')
  })
  it('should be able to open register page', () => {
    cy.get('button').contains('Nova Admissão').click()
    cy.url().should('include', '/new-user')
  })
})

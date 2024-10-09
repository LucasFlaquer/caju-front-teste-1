/// <reference types="cypress" />

describe('New User', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/registrations', {
      statusCode: 200,
      fixture: 'registrations.json',
    }).as('registrations')
    cy.intercept('POST', '**/registrations', {
      statusCode: 200,
    }).as('registrations')
    cy.visit('http://localhost:3001/#/new-user')
    cy.viewport(1920, 980)
    cy.wait('@registrations')
  })
  it('should be able to create a new registration', () => {
    cy.get('#name').type('Jhonn Doe')
    cy.get('#email').type('jhonn@doe.com')
    cy.get('#cpf').type('42831345898')
    cy.get('#admissionDate').type('1996-12-14')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})


describe('Login', () => {
  beforeEach(() => cy.clearCookies())

  it('should reject incorrect passwords', () => {
    cy.visit('/login')
    cy.get('#id_username').type('patrick')
    cy.get('#id_password').type('secret')
    cy.get('button[type="submit"]').click()

    cy.contains('ul.errorlist', 'Please enter a correct username and password')
  })

  it('should accept a correct login', () => {
    cy.visit('/logout')
    cy.visit('/login')
    cy.get('#id_username').type('patrick')
    cy.get('#id_password').type('swordfish')
    cy.get('button[type="submit"]').click()
  })
})

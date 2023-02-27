describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://www.cbastats.com/')
    cy.get('.ant-menu-title-content > a').contains('球员').click()
    cy.url().should('equal', 'https://www.cbastats.com/#/players/index')
  })
})

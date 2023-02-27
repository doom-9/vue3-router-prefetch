describe('preFetch', () => {
  it('hoverPreFetch', () => {
    cy.visit('http://127.0.0.1:5173/#/')
    cy.intercept('two.vue').as('preFetch')
    cy.contains('two').trigger('mouseenter')
    cy.wait('@preFetch').its('response.statusCode').should('eq', 304)
  })

  it('viewPreFetch', () => {
    cy.visit('http://127.0.0.1:5173/#/')
    cy.intercept('three.vue').as('preFetch')
    cy.wait('@preFetch').its('response.statusCode').should('eq', 304)
  })

  it('noPreFetch', () => {
    cy.visit('http://127.0.0.1:5173/#/')
    cy.intercept('two.vue').as('preFetch')
    cy.wait('@preFetch')
  })
})

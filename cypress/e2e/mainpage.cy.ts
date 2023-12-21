describe('Dashboard Feature', () => {
  it('Acceso correcto a la pagina', () => {
    cy.visit('http://localhost:8080')
  })
  it('Renderiza la tabla', () => {
    cy.visit('http://localhost:8080')
    cy.get('table').should('exist')
  })
  it('Renderiza barra de busqueda y revisa funcionalidad', () => {
    cy.visit('http://localhost:8080').then(win => {
      cy.stub(win, 'open').as('newTab')
    })
    cy.get('form').should('exist')
    cy.get('input[type="text"]').should('exist').type('VUI')
    cy.get('table tbody tr').should('have.length.greaterThan', 0).then(async (rows) => {
      const randomIndex = Math.floor(Math.random() * rows.length)
      const randomRow = rows[randomIndex]
      cy.wrap(randomRow).click()
      cy.get('@newTab').should('be.calledWith', Cypress.sinon.match('https://des.vui.cr/BPM_TareaPersonal.aspx'));
    })
  })
  it('Renderiza radio filters y revisa funcionalidad', () => {
    cy.visit('http://localhost:8080').then(win => {
      cy.stub(win, 'open').as('newTab')
    })
    cy.get('input[type="radio"]').should('exist').check('SISTEMAS')
    cy.get('table tbody tr').should('have.length.greaterThan', 0).then(async (rows) => {
      const randomIndex = Math.floor(Math.random() * rows.length)
      const randomRow = rows[randomIndex]
      cy.wrap(randomRow).click()
      cy.get('@newTab').should('be.calledWith', Cypress.sinon.match('http://sistemas-des-int.procomer.com/BPM_TareaPersonal.aspx'));
    })
  })
})
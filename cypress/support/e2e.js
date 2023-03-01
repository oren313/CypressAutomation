// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(()=>{
    Cypress.on('uncaught:exception',()=>{
        return false
    })
    cy.visit('./')
})
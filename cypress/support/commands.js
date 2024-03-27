// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { loginPage } from "./pageObject/loginPage"

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('OpenPage',()=>{
    cy.visit('/')
})

Cypress.Commands.add('ValidLogin',()=>{
    cy.fixture('validUser').then((validUser) => {
        loginPage.elements.login.username().should('be.visible')
            .clear()
            .type(validUser.user.username)
            //.should('have.value', username)
        loginPage.elements.login.password().type(validUser.user.password)
        loginPage.elements.login.loginButton()  
            .click()
        cy.get('[class="title"]').should('contain','Products')
        cy.url().should('include', '/inventory.html')
    })
})

Cypress.Commands.add('GetOnlyNumbersFromString', { prevSubject: true }, (subject) => {
    return cy.wrap(subject).then(($el) => {
      const text = $el.text().trim();
      const numericValue = parseFloat(text.replace(/[^\d.]/g, ''));
      return numericValue;
    })
})
Cypress.Commands.add('RemoveNewTab', (selector) => {
    cy.get(selector).invoke('removeAttr', 'target')
    .click()
})

Cypress.Commands.add('ChangeTarget',(selector)=>{
    cy.get(selector).invoke('attr','target','_self')
        .click()
})

Cypress.Commands.add('RemoveAll',(selector, link)=>{
    cy.get(selector).invoke('attr','target','_self')
        .click()
    cy.url().should('include', link)
})

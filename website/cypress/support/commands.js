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

Cypress.Commands.add('tempLogin', ()=> {
    cy.get('#tempSignup').click();
    cy.contains('AI Football Scout request form')
})

Cypress.Commands.add('dashboardinput', ()=> {
    cy.tempLogin();
    cy.get('#position_card').click();
    cy.get('#continue_button_1').click();
    cy.get('#ageRange_card').click();
    cy.get('#continue_button_2').click();
    cy.get('#category_card').click();
    cy.get('#submit_button').click();
    cy.contains('Searching for')
})

Cypress.Commands.add('addToShortlist', ()=> {

    cy.dashboardinput();
    cy.get('.addShortlist').eq(0).click();
    cy.get('.addShortlist').eq(1).click();
    cy.get('.addShortlist').eq(2).click();
    cy.contains('Current Shortlist (3)')
})
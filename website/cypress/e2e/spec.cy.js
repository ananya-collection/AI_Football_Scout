describe('template spec', () => {


  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })


  it('load homepage', () => {
    cy.contains('Welcome Scouts!');
  })

  it('temp login leads to dashboard', ()=> {
    cy.get('#tempSignup').click();
    cy.contains('AI Football Scout request form');
  })


  it('click on dashboard elements', ()=> {

    cy.tempLogin();
    cy.get('#position_card').click();
    cy.get('#continue_button_1').click();
    cy.get('#ageRange_card').click();
    cy.get('#continue_button_2').click();
    cy.get('#category_card').click();
    cy.get('#submit_button').click();
    cy.contains('Searching for');

  })

  it('check if adding to shortlist works', ()=> {

    cy.dashboardinput();
    cy.get('.addShortlist').eq(0).click();
    cy.get('.addShortlist').eq(1).click();
    cy.get('.addShortlist').eq(2).click();
    cy.contains('Current Shortlist (3)');     //TODO: SOMETIMES SHORTLIST COUNT STARTS WITH ONE I THINK
    
  })

  it('view shortlist', ()=> {

    cy.addToShortlist();
    cy.get('#shortlistButton').click();
    cy.contains('Shortlist');
    cy.get('#shortlistTable').find('tr').should('have.length', 4);

  })

  it('check if removing from shortlist works', ()=> {

    cy.addToShortlist();
    cy.contains('Current Shortlist (3)');
    cy.get('#clearShortlist').click();
    cy.contains('Current Shortlist (0)');

  })

})


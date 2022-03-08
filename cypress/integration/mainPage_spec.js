context('Assertions', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'example.json'})
    cy.visit('http://localhost:3000/')
  })


  it('User should be able to see title of the page', () => {
    cy.get('.page-title').contains('Burrito Builder')
  })

  it('User should see the start list of orders already made on page load, the orders before the user makes their own', () => {
    cy.get('.orders')
    .children('article')
    .should('have.length', 2)
  })

  it('User should be able to see and type their name into input field', () => {
    cy.get('#name').type('Binya Binya')
  })

  it('If user tries to submit their name before adding toppings, the orders list should stay the same', () => {
    cy.get('#name').type('Binya Binya')
    cy.get('.submit').contains('Submit Order').click()

    cy.get('.orders')
    .children('article')
    .should('have.length', 2)
  })

  it('If the user has not clicked any buttons to add toppings, the site should display a message saying that', () => {
    cy.get('p').contains('Order: Nothing selected')
  })

  it('User should see a list of buttons they can click for toppings', () => {

  })


  })
  
  //user should see a list of buttons (how would I account for the list of buttons?)
  //User should be able to click as many buttons as possible, and see the order thing change
  //user should be able to click submit button, and see the list of orders change
  //user should be able to change the amount of orders on the page, add to it
  //User should be able to see the background image
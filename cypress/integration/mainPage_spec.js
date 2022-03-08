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

  it('User should see a list of buttons they can click for toppings on their burrito', () => {
    cy.get('.button-container')
    .children('button')
    .should('have.length', 12)
  })

  it('User should be able to click on buttons for toppings they wants, and see the toppings they ordered in a list', () => {
    cy.get('.beans').contains('beans').click()
    cy.get('.sofritas').contains('sofritas').click()
    cy.get('.lettuce').contains('lettuce').click()
    cy.get('.steak').contains('steak').click()

    cy.get('p').contains('Order: beans, sofritas, lettuce, steak')
  })

  it('If user tries to submit order without putting in their name, the list of orders should not change', () => {
    cy.get('.beans').contains('beans').click()
    cy.get('.sofritas').contains('sofritas').click()
    cy.get('.lettuce').contains('lettuce').click()
    cy.get('.steak').contains('steak').click()

    cy.get('p').contains('Order: beans, sofritas, lettuce, steak')
    cy.get('.submit').contains('Submit Order').click()

    cy.get('.orders')
    .children('article')
    .should('have.length', 2)
  })

  it('User should be able to put in their name, and click the toppings they want, and submit an order and change the order list', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', 
    {
      name: 'Sandy',
      ingredients: [ 'steak', 'lettuce', 'beans']
    }
    )
    cy.get('#name').type('Sandy')
    cy.get('.steak').contains('steak').click()
    cy.get('.lettuce').contains('lettuce').click()
    cy.get('.beans').contains('beans').click()
    cy.get('.submit').contains('Submit Order').click()
  })

  it('User should see the list change after successfully submitting their order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', 
    {
      name: 'Sandy',
      ingredients: [ 'steak', 'lettuce', 'beans']
    }
    )
    cy.get('#name').type('Sandy')
    cy.get('.steak').contains('steak').click()
    cy.get('.lettuce').contains('lettuce').click()
    cy.get('.beans').contains('beans').click()
    cy.get('.submit').contains('Submit Order').click()

    cy.get('.orders')
    .children('article')
    .should('have.length', 3)
  })

  })
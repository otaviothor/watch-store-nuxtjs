import { makeServer } from '../../miragejs/server';

context('Store', () => {
  let server;
  const g = cy.get;
  const gid = cy.getByTestId;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should display the store', () => {
    cy.visit('/');

    g('body').contains('Brand');
    g('body').contains('Wrist Watch');
  });

  context.only('Store > Shopping Cart', () => {
    const quantity = 10;
    beforeEach(() => {
      server.createList('product', quantity);
      cy.visit('/');
    });

    it('should not display shopping cart when page first loaded', () => {
      gid('shopping-cart').should('have.class', 'hidden');
    });

    it('should toggle shopping cart visibility when button is clicked', () => {
      gid('toggle-button').as('toggleButton');
      g('@toggleButton').click();
      gid('shopping-cart').should('not.have.class', 'hidden');

      g('@toggleButton').click({ force: true });
      gid('shopping-cart').should('have.class', 'hidden');
    });

    it('should open shopping cart when a product is added', () => {
      gid('product-card').first().find('button').click();
      gid('shopping-cart').should('not.have.class', 'hidden');
    });

    it('should add first product to the cart', () => {
      gid('product-card').first().find('button').click();
      gid('cart-item').should('have.length', 1);
    });

    it('should add 1 product to the cart', () => {
      cy.addToCart(6);
      gid('cart-item').should('have.length', 1);
    });

    it('should add 3 products to the cart', () => {
      cy.addToCart([1, 3, 5]);
      gid('cart-item').should('have.length', 3);
    });

    it('should add all products to the cart', () => {
      cy.addToCart('all');
      gid('cart-item').should('have.length', quantity);
    });
  });

  context('Store > Product List', () => {
    it('should display "0 Products" when no products is returned', () => {
      cy.visit('/');
      gid('product-card').should('have.length', 0);
      g('body').contains('0 Products');
    });

    it('should display "1 Product" when 1 product is returned', () => {
      server.create('product');

      cy.visit('/');
      gid('product-card').should('have.length', 1);
      g('body').contains('1 Product');
    });

    it('should display "10 Products" when 10 products is returned', () => {
      server.createList('product', 10);

      cy.visit('/');
      gid('product-card').should('have.length', 10);
      g('body').contains('10 Products');
    });
  });

  context('Store > Search for products', () => {
    it('should type in the search field', () => {
      cy.visit('/');
      g('input[type="search"]')
        .type('some text here')
        .should('have.value', 'some text here');
    });

    it('should return one product when "beautiful watch" is used as search term', () => {
      server.create('product', {
        title: 'beautiful watch',
      });
      server.createList('product', 10);

      cy.visit('/');
      g('input[type="search"]').type('beautiful watch');
      gid('search-form').submit();
      gid('product-card').should('have.length', 1);
    });

    it('should return any product', () => {
      server.createList('product', 10);

      cy.visit('/');
      g('input[type="search"]').type('beautiful watch');
      gid('search-form').submit();
      gid('product-card').should('have.length', 0);
      g('body').contains('0 Products');
    });
  });
});

Cypress.Commands.add('getByTestId', (selector) =>
  cy.get(`[data-testid="${selector}"]`)
);

Cypress.Commands.add('addToCart', (mode) => {
  cy.getByTestId('product-card').as('productCards');

  const click = (index) =>
    cy.get('@productCards').eq(index).find('button').click({ force: true });

  const addByIndexes = () => {
    for (const index of mode) {
      cy.get('@productCards').eq(index).find('button').click({ force: true });
    }
  };

  const addAll = () => {
    cy.get('@productCards').then(($elements) => {
      for (let i = 0; i < $elements.length; i++) {
        click(i);
      }
    });
  };

  if (Array.isArray(mode)) {
    addByIndexes();
  } else if (typeof mode === 'number') {
    click(mode);
  } else if (typeof mode === 'string' && mode === 'all') {
    addAll();
  } else {
    throw new Error(
      'Please, provide a valid input for cy.addToCart()\r\nPossible values are Array, number or "all"'
    );
  }
});

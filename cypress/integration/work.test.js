it('loads the home page', () => {
  cy.visit('/work');
  cy.findByText(/My Work/, { selector: 'h1' });
  cy.findByTestId('portfolio-list')
    .get('li:first-child')
    .should('contain.text', 'Final Round Esports');
});

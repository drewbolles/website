it('loads the home page', () => {
  cy.visit('/about');
  cy.findByText(/About Me/, { selector: 'h1' });
});

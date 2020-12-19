it('loads the home page', () => {
  cy.visit('/talks');
  cy.findByText(/My Talks/, { selector: 'h1' });
  cy.findByTestId('talks-list').children().should('have.length.gt', 2);
});

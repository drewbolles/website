it('loads the home page', () => {
  cy.visit('/');
  cy.findByText(/Drew Bolles/, { selector: 'span' });
  cy.findByText(/Get in touch/)
    .parent('a')
    .should('have.attr', 'href', 'mailto:contact@drewbolles.com');
});

it('loads and displays resume', () => {
  cy.visit('/resume');
  cy.findByTestId('page-title').should('contain', 'Resume');
  cy.findByLabelText(/Send me an email/)
    .its('0.href')
    .should('eq', 'mailto:contact@drewbolles.com');

  cy.findByText(/Experience/i).should('be.visible');
  cy.findByTestId('experience-list').children().should('have.length.gt', 4);
  cy.findByText(/References/i).should('be.visible');
});

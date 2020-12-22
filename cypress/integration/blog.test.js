it('loads the blog page', () => {
  cy.visit('/blog', {
    onBeforeLoad: win => {
      cy.stub(win, 'open').as('windowOpen');
    },
  });
  cy.findByText(/Blog/, { selector: 'h1' });
  cy.findByTestId('blog-list').get('li').should('have.length.gt', 5);
  cy.findByTestId('blog-list')
    .get('li:first-child')
    .findByTestId('post-title')
    .click();
  cy.url().should('not.eq', `${Cypress.config().baseUrl}/blog`);
  cy.findAllByLabelText('Share on Facebook').first().click();
  cy.get('@windowOpen').should(
    'be.calledWithMatch',
    /facebook.com\/share.php/gi,
  );
  cy.findAllByLabelText('Share on Twitter').first().click();
  cy.get('@windowOpen').should('be.calledWithMatch', /twitter.com\/intent/gi);
});

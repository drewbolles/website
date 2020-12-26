import * as React from 'react';
import { render } from '@testing-library/react';
import PortfolioImg from './PortfolioImg';

test('it renders with the correct picture syntax', () => {
  const { getByAltText, getByTestId } = render(
    <PortfolioImg src="/uploads/screenshots/test.png" alt="My Test Image" />,
  );
  expect(getByAltText('My Test Image')).toBeInTheDocument();
  expect(getByTestId('portfolio-img')).toMatchInlineSnapshot(`
    <img
      alt="My Test Image"
      data-testid="portfolio-img"
      decoding="async"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      style="visibility: hidden; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; box-sizing: border-box; padding: 0px; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center top;"
    />
  `);
});

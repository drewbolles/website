import * as React from 'react';
import { render } from '@testing-library/react';
import PortfolioImg from './PortfolioImg';

const imgStub = {
  src: 'test-src.png',
  srcSet: 'test-src-set.png 1x, test-src-set-2.png 2x',
};

jest.mock('./requireImages.ts', () => ({
  requireImg: () => imgStub,
  requireImgWebp: () => imgStub,
}));

test('it renders with the correct picture syntax', () => {
  const { getByAltText, getByTestId } = render(
    <PortfolioImg src="/uploads/screenshots/test.png" alt="My Test Image" />,
  );
  expect(getByAltText('My Test Image')).toBeInTheDocument();
  expect(getByTestId('portfolio-img')).toMatchInlineSnapshot(`
    <picture
      data-testid="portfolio-img"
    >
      <source
        srcset="test-src-set.png 1x, test-src-set-2.png 2x"
        type="image/webp"
      />
      <img
        alt="My Test Image"
        sizes="(min-width: 768px) 50vw, 100vw"
        src="test-src.png"
        srcset="test-src-set.png 1x, test-src-set-2.png 2x"
      />
    </picture>
  `);
});

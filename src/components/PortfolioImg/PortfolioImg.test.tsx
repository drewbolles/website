import * as React from 'react';
import { render } from '@testing-library/react';
import PortfolioImg from './PortfolioImg';

const imgStub = {
  src: 'test-src.png',
  srcSet: 'test-src-set.png 1x, test-src-set-2.png 2x',
};

jest.mock('./requireImages.ts', () => ({
  responsiveImgs: {
    base: [{ mq: '(min-width: 300px)', requireFn: jest.fn(() => imgStub) }],
    webp: [
      {
        mq: '(max-width: 400px) and (min-width: 100px)',
        requireFn: jest.fn(() => imgStub),
      },
    ],
  },
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
        media="(max-width: 400px) and (min-width: 100px)"
        srcset="test-src-set.png 1x, test-src-set-2.png 2x"
        type="image/png"
      />
      <source
        media="(min-width: 300px)"
        srcset="test-src-set.png 1x, test-src-set-2.png 2x"
        type="image/png"
      />
      <img
        alt="My Test Image"
        src="test-src.png"
      />
    </picture>
  `);
});

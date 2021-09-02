import * as React from 'react';

import { render, screen } from '@testing-library/react';

import RenderQuery from './RenderQuery';

test('renders loading element for loading status', () => {
  render(<RenderQuery status="loading">child</RenderQuery>);
  expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  expect(screen.queryByText(/child/i)).toBeNull();
});

test('renders error element for error status', () => {
  render(<RenderQuery status="error">child</RenderQuery>);
  expect(screen.getByText(/Opps/i)).toBeInTheDocument();
  expect(screen.queryByText(/child/i)).toBeNull();
});

test('renders child element for success status', () => {
  render(<RenderQuery status="success">child</RenderQuery>);
  expect(screen.getByText(/child/i)).toBeInTheDocument();
});

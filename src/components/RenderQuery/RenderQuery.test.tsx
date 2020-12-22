import * as React from 'react';
import { render } from '@testing-library/react';
import RenderQuery from './RenderQuery';

test('renders loading element for loading status', () => {
  const { queryByText, getByTestId } = render(
    <RenderQuery status="loading">child</RenderQuery>,
  );
  expect(getByTestId('circular-progress')).toBeInTheDocument();
  expect(queryByText(/child/i)).toBeNull();
});

test('renders error element for error status', () => {
  const { queryByText, getByText } = render(
    <RenderQuery status="error">child</RenderQuery>,
  );
  expect(getByText(/Opps/i)).toBeInTheDocument();
  expect(queryByText(/child/i)).toBeNull();
});

test('renders child element for success status', () => {
  const { getByText } = render(
    <RenderQuery status="success">child</RenderQuery>,
  );
  expect(getByText(/child/i)).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';

import { wrapper } from '../../../utils/tests/react';
import Pagination from '../Pagination';

it('renders previous and next page buttons', () => {
  const { getByText } = render(
    <Pagination numberOfPages={4} currentPage={3} />,
    { wrapper },
  );
  const prevPageButton = getByText(/previous/i);
  const nextPageButton = getByText(/next/i);
  expect(prevPageButton.getAttribute('href')).toBe('/blog/page/2/');
  expect(nextPageButton.getAttribute('href')).toBe('/blog/page/4/');
});

it('hides the next button on the last page', () => {
  const { queryByText } = render(
    <Pagination numberOfPages={3} currentPage={3} />,
    { wrapper },
  );
  expect(queryByText(/next/i)).toBe(null);
});

it('hides the previous button on the first page', () => {
  const { queryByText } = render(
    <Pagination numberOfPages={2} currentPage={1} />,
    { wrapper },
  );
  expect(queryByText(/previous/i)).toBe(null);
});

it('links to /blog/ without a page path for the first page', () => {
  const { getByText } = render(
    <Pagination numberOfPages={3} currentPage={2} />,
    { wrapper },
  );
  const prevPageButton = getByText(/previous/i);
  expect(prevPageButton.getAttribute('href')).toBe('/blog/');
});

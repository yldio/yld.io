import React from 'react';
import { render } from '@testing-library/react';

import InternalAnchor from '../InternalAnchor';

it('renders a Gatsby Link with href', async () => {
  const { findByText } = render(
    <InternalAnchor to="/page/?query#fragment">Page</InternalAnchor>,
  );
  const anchor = await findByText('Page');
  expect(anchor).toHaveAttribute('href', '/page/?query#fragment');
});

it('appends a missing trailish slash', async () => {
  const { findByText } = render(
    <InternalAnchor to="/page?query#fragment">Page</InternalAnchor>,
  );
  const anchor = await findByText('Page');
  expect(anchor).toHaveAttribute('href', '/page/?query#fragment');
});

it('passes through props', async () => {
  const { findByText } = render(
    <InternalAnchor to="/" getProps={() => ({ target: '_blank' })}>
      Page
    </InternalAnchor>,
  );
  const anchor = await findByText('Page');
  expect(anchor).toHaveAttribute('target', '_blank');
});

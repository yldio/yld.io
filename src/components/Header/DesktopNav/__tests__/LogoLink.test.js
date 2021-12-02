import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HomePageContext } from '../../../../context/PageContext';

import LogoLink from '../LogoLink';

let mockScrollTo;
let originalScrollTo;
beforeEach(() => {
  // eslint-disable-next-line no-multi-assign
  window.scrollTo = mockScrollTo = jest.fn();
});
afterEach(() => {
  window.scrollTo = originalScrollTo;
});

describe('by default', () => {
  let elem;

  beforeEach(() => {
    elem = render(<LogoLink />);
  });

  it('renders the logo', () => {
    expect(elem.getAllByTitle('YLD default logo')).toHaveLength(1);
  });

  it('links to the homepage', () => {
    const { pathname } = new URL(elem.queryByRole('link').href);
    expect(pathname).toBe('/');
  });
});

describe('with a fillColorInitial', () => {
  it('renders the logo colored', () => {
    const { getByRole } = render(<LogoLink fillColorInitial="red" />);
    expect(getByRole('img').querySelectorAll('[fill="red"]')).toHaveLength(1);
  });
});

describe('on the homepage', () => {
  it('links to the top of the page', () => {
    const { getByRole } = render(
      <HomePageContext.Provider value>
        <LogoLink />
      </HomePageContext.Provider>,
    );
    const logo = getByRole('img');

    fireEvent.click(logo);
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });
});

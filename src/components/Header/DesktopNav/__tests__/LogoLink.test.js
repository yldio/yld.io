import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HomePageContext } from '../../../../context/PageContext';

import LogoLink from '../LogoLink';
import { colors } from '../../../../utils/theme';

let mockScrollTo;
let originalScrollTo;
beforeEach(() => {
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

describe('with square=true', () => {
  it('renders the squared logo', () => {
    const { getAllByTitle } = render(<LogoLink squared />);
    expect(getAllByTitle('YLD squared logo')).toHaveLength(1);
  });
});

describe('with a fillColorInitial', () => {
  it('renders the logo colored', () => {
    const { getByRole } = render(<LogoLink fillColorInitial="red" />);
    expect(getByRole('img').querySelectorAll('[fill="red"]')).toHaveLength(1);
  });

  it('of text color renders the animated text-colored logo', () => {
    const { getByRole } = render(<LogoLink fillColorInitial={colors.text} />);
    expect(getByRole('img')).toHaveAttribute('alt', 'YLD animated logo');
  });
});

describe('on the homepage', () => {
  it('links to the top of the page', () => {
    const { getByRole } = render(
      <HomePageContext.Provider value={true}>
        <LogoLink />
      </HomePageContext.Provider>,
    );
    const logo = getByRole('img');

    fireEvent.click(logo);
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  LogoStyleContext,
  HomePageContext,
} from '../../../../context/PageContext';

import LogoLink from '../LogoLink';

let mockScrollTo;
let originalScrollTo;
beforeEach(() => {
  window.scrollTo = mockScrollTo = jest.fn();
});
afterEach(() => {
  window.scrollTo = originalScrollTo;
});

describe('by default', () => {
  let logo;

  beforeEach(() => {
    const { getByAltText } = render(<LogoLink />);
    logo = getByAltText(/logo/i);
  });

  it('renders the black logo GIF', () => {
    expect(logo.src).toContain('logo_animated.gif');
  });

  it('links to the homepage', () => {
    const { pathname } = new URL(logo.closest('a').href);
    expect(pathname).toBe('/');
  });
});

describe('with LogoStyle white', () => {
  it('renders the static white logo', () => {
    const { getByAltText } = render(
      <LogoStyleContext.Provider value="white">
        <LogoLink />
      </LogoStyleContext.Provider>,
    );
    const logo = getByAltText(/logo/i);
    expect(logo.src).toContain('yld-white.svg');
  });

  describe('on the homepage', () => {
    it('links to the top of the page', () => {
      const { getByAltText } = render(
        <LogoStyleContext.Provider value="white">
          <HomePageContext.Provider value={true}>
            <LogoLink />
          </HomePageContext.Provider>
        </LogoStyleContext.Provider>,
      );
      const logo = getByAltText(/logo/i);

      fireEvent.click(logo);
      expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});

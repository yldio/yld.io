import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import { UnstyledButton } from '../Common/Button'
import outlineStyles from './outlineStyles'

const HamburgerSvg = styled.svg`
  fill: ${({ themeVariation, theme }) =>
    themeVariation === theme.variations.dark
      ? theme.colors.white
      : theme.colors.text};
`

const HamburgerButton = styled(UnstyledButton)`
  ${breakpoint('phone')`
    position: fixed;
    right: 0;
    top: 0;
    width: ${remcalc(80)};
    height: ${remcalc(80)};

    margin: ${remcalc(4)};
    ${outlineStyles}
  `}

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const Hamburger = ({ themeVariation, onClick }) => (
  <HamburgerButton onClick={onClick}>
    <HamburgerSvg
      themeVariation={themeVariation}
      title="open menu"
      width="24"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 16h24v2H0zm0-8h24v2H0zm0-8h24v2H0z" fillRule="evenodd" />
    </HamburgerSvg>
  </HamburgerButton>
)

export default Hamburger

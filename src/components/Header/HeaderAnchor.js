import styled, { css } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import is from 'styled-is'
import Anchor from '../Common/Anchor'

export const outlineStyles = css`
  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:active {
    outline: none;
  }
`

const HeaderAnchor = styled(Anchor)`
  transition-duration: ${props => props.theme.animations.normal};
  transition-timing-function: ease-out;
  transition-property: opacity, color, outline;
  padding: 0;
  background: linear-gradient(to right, #616161 0%, transparent 0);

  /* Styles for mobile */
  opacity: 0.5;
  font-size: ${remcalc(28)};
  font-weight: 500;
  line-height: 1.14;
  display: block;

  &:hover, &.active {
    color: ${props => props.theme.colors.white};
    opacity: 1; 
  }

  ${breakpoint('phone')`
    font-size: ${remcalc(42)};
  `}

  /* Styles for Tablet and above */
  ${breakpoint('tablet')`
    font-size: 100%;
    font-weight: 400;
    opacity: 1;
    padding: ${remcalc(10)} ${remcalc(6)} ${remcalc(14)};

    color: ${props => props.theme.colors.textLight};

    ${is('light')`
      color: ${props => props.theme.colors.grey}; 
    `}

    &.active {
      color: ${props => props.theme.colors.text};

      ${is('light')`
        color: ${props => props.theme.colors.white};
      `}
    }

    &:hover {
      color: ${props => props.theme.colors.text};

      ${is('light')`
        color: ${props => props.theme.colors.white};
      `}

      @media (pointer: fine) {
        &:after {
          width: 100%;
          opacity: 1;
          transition: all ${props => props.theme.animations.normal} ease-out;
        }
      }
    }

    &:active {
      outline: none;
    }

    ${outlineStyles}
  `}; 
`

export default HeaderAnchor

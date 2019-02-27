import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

import Anchor from '../Common/Anchor'
import outlineStyles from './outlineStyles'

const HeaderAnchor = styled(Anchor)`
  transition-duration: ${props => props.theme.animations.normal};
  transition-timing-function: ease-out;
  transition-property: opacity, color, outline;
  padding: 0;
  background: linear-gradient(to right, #616161 0%, transparent 0);
  ${outlineStyles}
`

export const SideNavAnchor = styled(HeaderAnchor)`
  opacity: 0.5;
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  display: block;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`

export const TopNavAnchor = styled(HeaderAnchor)`
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  opacity: 1;
  padding: ${remcalc(10)} ${remcalc(15)} ${remcalc(14)};

  color: ${props => props.theme.colors.grey};

  &.active,
  &:hover {
    color: ${props => props.theme.colors.white};
  }

  ${is('dark')`
    color: ${props => props.theme.colors.textLight};

    &.active, &:hover {
      color: ${props => props.theme.colors.text};
    }
  `}
`

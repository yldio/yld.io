import styled from 'styled-components'
import remcalc from 'remcalc'
import Anchor from '../Common/Anchor'
import { outlineStyles } from './elements'

const HeaderAnchor = styled(Anchor)`
  transition: all ${props => props.theme.animations.normal} ease-out;
  padding: ${remcalc(10)} ${remcalc(6)} ${remcalc(14)};
  background: linear-gradient(to right, #616161 0%, transparent 0);
  position: relative;
  color: ${props => props.theme.colors.text};

  &:hover {
    color: ${props => props.theme.colors.textLight};

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

  &.active {
    opacity: 1;
  }
`

export default HeaderAnchor

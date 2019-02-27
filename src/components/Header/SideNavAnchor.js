import styled from 'styled-components'
import remcalc from 'remcalc'

import Anchor from '../Common/Anchor'
import headerAnchorStyles from './headerAnchorStyles'

const SideNavAnchor = styled(Anchor)`
  ${headerAnchorStyles}
  display: block;
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  color: ${props => props.theme.colors.white};
  opacity: 0.5;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`

export default SideNavAnchor

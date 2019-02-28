import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

import Anchor from '../Common/Anchor'
import headerAnchorStyles from './headerAnchorStyles'

const TopNavAnchor = styled(Anchor)`
  ${headerAnchorStyles}
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  opacity: 1;

  color: ${props => props.theme.colors.text};

  &.active,
  &:hover {
    color: ${props => props.theme.colors.text};
  }

  ${is('dark')`
    color: ${props => props.theme.colors.white};
    
    &.active,
    &:hover {
      color: ${props => props.theme.colors.white};
    }
  `}
`

export default TopNavAnchor

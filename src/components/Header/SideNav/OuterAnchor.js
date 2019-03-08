import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'

const OuterAnchor = styled(Anchor)`
  display: block;
  ${headerItemStyles}
  ${fontSizeAndWeight}
  ${defaultStyles}

  &:hover,
  &:active,
  &.active {
    ${hoverActiveStyles}
  }
`

export default OuterAnchor

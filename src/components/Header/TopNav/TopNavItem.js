import styled from 'styled-components'
import remcalc from 'remcalc'

import { lightStates, darkStates } from './outerItemStates'

const TopNavItem = styled.li.attrs(props => ({
  states: props.themeVariation === 'dark' ? darkStates : lightStates
}))`
  @media screen and (min-width: 960px) {
    margin-right: ${remcalc(6)};

    &:last-child {
      margin-right: ${remcalc(0)};
    }
  }
`

export default TopNavItem

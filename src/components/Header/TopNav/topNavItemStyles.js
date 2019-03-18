import { css } from 'styled-components'
import remcalc from 'remcalc'

const topNavItemStyles = css`
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(6)} ${remcalc(11)} ${remcalc(10)};
  margin: ${remcalc(4)};
`

export default topNavItemStyles

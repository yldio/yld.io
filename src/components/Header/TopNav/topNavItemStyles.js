import { css } from 'styled-components'
import remcalc from 'remcalc'

export const fontSizeAndWeight = css`
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
`

export const itemSpacing = css`
  padding: ${remcalc(6)} ${remcalc(11)} ${remcalc(10)};
  margin: ${remcalc(4)};
`

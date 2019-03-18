import { css } from 'styled-components'
import remcalc from 'remcalc'

export const fontSizeAndWeight = css`
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
`

export const itemSpacing = css`
  padding: ${remcalc('9')} ${remcalc('34')} ${remcalc('7')} ${remcalc('20')};
  margin: ${remcalc('4')};
`

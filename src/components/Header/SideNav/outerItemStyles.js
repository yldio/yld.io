import { css } from 'styled-components'
import remcalc from 'remcalc'

export const fontSizeAndWeight = css`
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
`

export const defaultStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 0.5;
`

export const hoverActiveStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

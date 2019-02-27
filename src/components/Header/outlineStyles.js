import { css } from 'styled-components'
import remcalc from 'remcalc'

const outlineStyles = css`
  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:active {
    outline: none;
  }
`

export default outlineStyles

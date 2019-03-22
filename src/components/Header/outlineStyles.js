import { css } from 'styled-components'
import remcalc from 'remcalc'

const outlineStyles = css`
  outline: ${remcalc(4)} solid transparent;
  &:focus {
    outline-color: ${props => props.theme.colors.vibrant};
    z-index: 1;
  }

  &:active {
    outline: none;
  }
`

export default outlineStyles

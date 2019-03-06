import { css } from 'styled-components'
import remcalc from 'remcalc'

const headerAnchorStyles = css`
  padding: ${remcalc(10)} ${remcalc(15)} ${remcalc(14)};
  transition: opacity ${props => props.theme.animations.normal} ease-out,
    color ${props => props.theme.animations.fast} ease-out,
    outline ${props => props.theme.animations.normal} ease-out;
  background: linear-gradient(to right, #616161 0%, transparent 0);
  outline: none;
`

export default headerAnchorStyles

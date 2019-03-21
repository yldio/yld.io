import { css } from 'styled-components'

const defaultStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 0.5;
`

const hoverActiveStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

const outerItemStates = {
  default: defaultStyles,
  hoverActive: hoverActiveStyles
}

export default outerItemStates

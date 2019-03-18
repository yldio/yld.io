import { css } from 'styled-components'

export const defaultStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 0.5;
`

export const hoverActiveStyles = css`
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

import { css } from 'styled-components'

export default css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

export const hoverDarkStyles = css`
  background: #3a3553;
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

export const clickTapDarkStyles = css`
  background: ${props => props.theme.colors.vibrant};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

export const activeDarkStyles = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  opacity: 0.7;
`

export const activeAndHoverDarkStyles = css`
  background: ${props => props.theme.colors.vibrant};
  color: #007f56;
  opacity: 1;
`

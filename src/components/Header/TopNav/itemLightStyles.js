import { css } from 'styled-components'

export default css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

export const hoverLightStyles = css`
  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

export const clickTapLightStyles = css`
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

export const activeLightStyles = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 0.5;
`

export const activeAndHoverLightStyles = css`
  background: ${props => props.theme.colors.text};
  color: #a9a9a9;
  opacity: 1;
`

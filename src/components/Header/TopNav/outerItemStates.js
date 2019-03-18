import { css } from 'styled-components'

const defaultLight = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

const hoverLight = css`
  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

const clickTapLight = css`
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

const activeLight = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 0.5;
`

const activeAndHoverLight = css`
  background: ${props => props.theme.colors.text};
  color: #a9a9a9;
  opacity: 1;
`

const defaultDark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

const hoverDark = css`
  background: #3a3553;
  color: ${props => props.theme.colors.white};
  opacity: 1;
`

const clickTapDark = css`
  background: ${props => props.theme.colors.vibrant};
  color: ${props => props.theme.colors.text};
  opacity: 1;
`

const activeDark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  opacity: 0.7;
`

const activeAndHoverDark = css`
  background: ${props => props.theme.colors.vibrant};
  color: #007f56;
  opacity: 1;
`

export const lightStates = {
  default: defaultLight,
  hover: hoverLight,
  clickTap: clickTapLight,
  active: activeLight,
  activeAndHover: activeAndHoverLight
}

export const darkStates = {
  default: defaultDark,
  hover: hoverDark,
  clickTap: clickTapDark,
  active: activeDark,
  activeAndHover: activeAndHoverDark
}

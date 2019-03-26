import { css } from 'styled-components'

const defaultLight = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
`

const hoverLight = css`
  background: ${props => props.theme.colors.text};
  color: #a9a9a9;
`

const clickTapLight = css`
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.white};
`

const activeLight = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`

const activeAndHoverLight = css`
  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`

const defaultDark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
`

const hoverDark = css`
  background: ${props => props.theme.colors.vibrant};
  color: #007f56;
`

const clickTapDark = css`
  background: ${props => props.theme.colors.vibrant};
  color: ${props => props.theme.colors.text};
`

const activeDark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
`

const activeAndHoverDark = css`
  background: #3a3553;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
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

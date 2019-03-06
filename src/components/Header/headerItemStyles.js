import { css } from 'styled-components'

const headerItemStyles = css`
  transition: opacity ${props => props.theme.animations.fast} ease-out,
    color ${props => props.theme.animations.fast} ease-out,
    outline ${props => props.theme.animations.fast} ease-out;
  background: linear-gradient(to right, #616161 0%, transparent 0);
  outline: none;
`

export default headerItemStyles

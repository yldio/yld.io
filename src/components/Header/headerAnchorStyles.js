import { css } from 'styled-components'

import outlineStyles from './outlineStyles'

const headerAnchorStyles = css`
  transition-duration: ${props => props.theme.animations.normal};
  transition-timing-function: ease-out;
  transition-property: opacity, color, outline;
  padding: 0;
  background: linear-gradient(to right, #616161 0%, transparent 0);
  ${outlineStyles}
`

export default headerAnchorStyles

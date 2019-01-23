import { css } from 'styled-components'
import is from 'styled-is'

const modifiers = css`
  ${is('secondary')`
    color: ${props => props.theme.colors.secondaryText};
  `}

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('textLight')`
    color: ${props => props.theme.colors.textLight};
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noMargin')`
    padding: 0;
  `};

  ${is('noMarginTop')`
    padding: 0;
  `};
`

export default modifiers

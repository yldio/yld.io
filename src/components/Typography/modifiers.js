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

  ${is('mute')`
    opacity: .5;
  `};

  ${is('mutedLight')`
  opacity: .8
`}

  ${is('noPadding')`
    padding: 0;
  `};

  ${is('noPaddingTop')`
    padding-top: 0;
  `};

  ${is('noPaddingBottom')`
    padding-bottom: 0;
  `};
`

export default modifiers

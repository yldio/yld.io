import { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

const BodyPrimaryStyles = css`
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(12)} 0;

  ${is('secondary')`
    color: ${props => props.theme.colors.secondaryText};
  `}

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noMargin')`
      padding: 0;
  `};
`

export default BodyPrimaryStyles

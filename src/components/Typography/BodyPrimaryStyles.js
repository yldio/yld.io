import { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

const BodyPrimaryStyles = css`
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(12)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('noMargin')`
      padding: 0;
  `};
`

export default BodyPrimaryStyles

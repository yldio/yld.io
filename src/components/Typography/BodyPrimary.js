import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'
import BodyPrimaryStyles from './BodyPrimaryStyles'

const BodyPrimary = styled.p`
  ${BodyPrimaryStyles}
  max-width: ${remcalc(600)};

  ${is('padded')`
    padding: ${remcalc(0)} 0 ${remcalc(24)} 0;
  `};

  ${is('center')`
    text-align:center;
    max-width: ${remcalc(900)};
    margin: auto;
  `};

  ${is('fullWidth')`
    max-width: 100% !important;
  `}
`

export default BodyPrimary

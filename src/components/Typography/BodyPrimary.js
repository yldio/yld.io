import styled from 'styled-components'
import is from 'styled-is'
import BodyPrimaryStyles from './BodyPrimaryStyles'

const BodyPrimary = styled.p`
  ${BodyPrimaryStyles}

  ${is('bold')`
    font-weight: 700;
  `};
`

export default BodyPrimary

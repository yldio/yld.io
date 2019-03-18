import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import close from '../../../images/close.svg'
import { UnstyledButton } from '../../Common/Button'
import outlineStyles from '../outlineStyles'

const CloseIcon = styled.img`
  fill: ${props => props.theme.colors.white};
`

const StyledButton = styled(UnstyledButton)`
  width: ${remcalc(80)};
  height: ${remcalc(80)};

  margin: ${remcalc(4)};
  ${outlineStyles}
`

const CloseButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <CloseIcon src={close} alt="Close menu" />
  </StyledButton>
)

export default CloseButton

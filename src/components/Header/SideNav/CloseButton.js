import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import close from '../../../images/close.svg'
import { UnstyledButton } from '../../Common/Button'

const StyledButton = styled(UnstyledButton)`
  width: ${remcalc(80)};
  height: ${remcalc(80)};

  margin: ${remcalc(4)};
`

const CloseButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <img src={close} alt="Close menu" />
  </StyledButton>
)

export default CloseButton

import React from 'react'
import Flex from 'styled-flex-component'
import styled from 'styled-components'

import ExternalAnchor from '../Common/ExternalAnchor'
import { BodyPrimary } from '../Typography'
import Hr from '../Common/Hr'

const StyledExternalAnchor = styled(ExternalAnchor)`
  height: 107px;
`

const JobLink = ({ position, hostedUrl, contractType }) => (
  <Flex column>
    <StyledExternalAnchor href={hostedUrl}>
      <BodyPrimary noPaddingBottom>{position}</BodyPrimary>
      <BodyPrimary noPadding muted>
        {contractType}
      </BodyPrimary>
    </StyledExternalAnchor>
    <Hr short noMarginTop />
  </Flex>
)

export default JobLink

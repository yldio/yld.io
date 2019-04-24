import React from 'react'

import ExternalAnchor from '../Common/ExternalAnchor'
import { BodyPrimary } from '../Typography'
import Hr from '../Common/Hr'

const JobLink = ({ position, hostedUrl, contractType }) => (
  <ExternalAnchor href={hostedUrl}>
    <BodyPrimary noPaddingBottom>{position}</BodyPrimary>
    <BodyPrimary noPaddingTop muted>
      {contractType}
    </BodyPrimary>
    <Hr short />
  </ExternalAnchor>
)

export default JobLink

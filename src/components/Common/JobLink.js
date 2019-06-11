import React from 'react'

import ExternalAnchor from '../Common/ExternalAnchor'
import { BodyPrimary } from '../Typography'
import Hr from '../Common/Hr'

const JobLink = ({ position, hostedUrl, contractType, location }) => (
  <ExternalAnchor
    href={hostedUrl}
    title={`${position} role ${location ? `in ${location}` : ''} for yld`}
  >
    <BodyPrimary noPaddingBottom>{position}</BodyPrimary>
    <BodyPrimary noPaddingTop muted>
      {contractType}
    </BodyPrimary>
    <Hr short />
  </ExternalAnchor>
)

export default JobLink

import React from 'react'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import SubtitleWithBody from '../Common/SubtitleWithBody'

// will come from Contentful
const data = {
  title: 'Our Technology partnerships',
  partners: [
    {
      name: 'Node foundation',
      type: 'Silver member',
      description:
        'YLD was one the first members of the Node.js Foundation, whose purpose is to support the ongoing growth and evolution of the Node.js platform, while maintaining a collaborative environment that benefits all.'
    },
    {
      name: 'Cloud native',
      type: 'Silver member',
      description:
        'We are members of the Cloud Native Computing Foundation, whose purpose is to foster the community by sustaining and integrating open-source technologies such as Kubernetes and orchestrating containers as part of a microservices architecture.'
    },
    {
      name: 'Docker',
      type: 'Silver member',
      description:
        'YLD was one the first members of the Node.js Foundation, whose purpose is to support the ongoing growth and evolution of the Node.js platform, while maintaining a collaborative environment that benefits all.'
    }
  ]
}

const PartnerCol = ({ name, type, description }) => (
  <Col key={name} width={1 / 3}>
    <SubtitleWithBody subtitle={type} body={description} />
  </Col>
)

const PartnershipsSection = () => (
  <BlueBackground>
    <Grid>
      <Row>
        <Col width={[1]}>
          <SectionTitle reverse>{data.title}</SectionTitle>
        </Col>
      </Row>
      <Row>{data.partners.map(partner => PartnerCol(partner))}</Row>
    </Grid>
  </BlueBackground>
)

export default PartnershipsSection

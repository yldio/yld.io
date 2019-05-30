import React from 'react'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import SubtitleWithBody from '../Common/SubtitleWithBody'

// will come from Contentful
const data = {
  title: 'Our Technology partnerships',
  partners: [
    {
      name: 'Node foundation',
      logo: '',
      membershipLevel: 'Silver member',
      description:
        'YLD was one the first members of the Node.js Foundation, whose purpose is to support the ongoing growth and evolution of the Node.js platform, while maintaining a collaborative environment that benefits all.'
    },
    {
      name: 'Cloud native',
      logo: '',
      membershipLevel: 'Silver member',
      description:
        'We are members of the Cloud Native Computing Foundation, whose purpose is to foster the community by sustaining and integrating open-source technologies such as Kubernetes and orchestrating containers as part of a microservices architecture.'
    },
    {
      name: 'Docker',
      logo: '',
      membershipLevel: 'Silver member',
      description:
        'YLD was one the first members of the Node.js Foundation, whose purpose is to support the ongoing growth and evolution of the Node.js platform, while maintaining a collaborative environment that benefits all.'
    }
  ]
}

const PartnerCol = ({ name, logo, membershipLevel, description }) => (
  <Col key={name} width={1 / 3}>
    <Image image={logo} alt={`Image of ${name}`} />
    <SubtitleWithBody
      subtitle={membershipLevel}
      body={description}
      themeVariation="dark"
    />
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

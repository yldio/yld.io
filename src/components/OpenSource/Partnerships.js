import React from 'react'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import SubtitleWithBody from '../Common/SubtitleWithBody'

const PartnerCol = ({ name, logoDarkTheme, membershipLevel, description }) => (
  <Col key={name} width={1 / 3}>
    <Image image={logoDarkTheme.title} alt={`Image of ${name}`} />
    <SubtitleWithBody
      subtitle={membershipLevel}
      body={description}
      themeVariation="dark"
    />
  </Col>
)

const PartnershipsSection = ({ title, partners }) => (
  <BlueBackground>
    <Grid>
      <Row>
        <Col width={[1]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </Col>
      </Row>
      <Row>{partners.map(partner => PartnerCol(partner))}</Row>
    </Grid>
  </BlueBackground>
)

export default PartnershipsSection

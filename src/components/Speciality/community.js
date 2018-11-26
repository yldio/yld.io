import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../BlueBG'
import styled from 'styled-components'

const TrimmedImage = styled.img`
  position: absolute;
  height: 125%;
  object-fit: cover;
  left: -30%;
  top: -15%;
  opacity: 0.6;
  z-index: -1;
`
const Trimmer = styled(Grid)`
  position: relative;
  overflow: hidden;
`
const CommunitySection = ({ specialty }) => (
  <BlueBackground>
    <Trimmer className="grid">
      <TrimmedImage
        alt={specialty.introGraphic.title}
        src={specialty.introGraphic.file.url}
      />
      <Padding top={6} bottom={6}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <img
              alt={specialty.communityLogo.title}
              src={specialty.communityLogo.file.url}
              style={{ maxHeight: '100%' }}
            />
          </Col>
          <Col md={6} sm={12} xs={12}>
            <H1 reverse>{`${specialty.title} community`}</H1>
            <Paragraph reverse muted>
              {specialty.communityText.content[0].content[0].value}
            </Paragraph>
          </Col>
        </Row>
      </Padding>
    </Trimmer>
  </BlueBackground>
)
export default CommunitySection

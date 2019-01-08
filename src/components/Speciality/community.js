import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SmallerH2, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../BlueBG'
import styled from 'styled-components'

const TrimmedImage = styled.img`
  position: absolute;
  height: 125%;
  max-height: 125%;
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

const ImgContainerCol = styled(Col)`
  display: flex !important; /* sorry */
  align-items: center;
  justify-content: center;
`
const CommunitySection = ({ speciality }) => (
  <BlueBackground>
    <Trimmer>
      <TrimmedImage
        alt={speciality.communityBackground.title}
        src={speciality.communityBackground.file.url}
      />
      <Padding top={5} bottom={5}>
        <Row>
          <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
            {speciality.communityLogo ? (
              <img
                alt={speciality.communityLogo.title}
                src={speciality.communityLogo.file.url}
                style={{ maxHeight: '100px' }}
              />
            ) : null}
          </ImgContainerCol>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SmallerH2
              reverse
            >{`${speciality.title.trim()} community`}</SmallerH2>
            <Paragraph reverse muted>
              {speciality.communityText.content[0].content[0].value}
            </Paragraph>
          </Col>
        </Row>
      </Padding>
    </Trimmer>
  </BlueBackground>
)
export default CommunitySection

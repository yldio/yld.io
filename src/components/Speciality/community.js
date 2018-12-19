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
const CommunitySection = ({ specialty }) => (
  <BlueBackground>
    <Trimmer>
      <TrimmedImage
        alt={specialty.communityBackground.title}
        src={specialty.communityBackground.file.url}
      />
      <Padding top={5} bottom={5}>
        <Row>
          <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
            {specialty.communityLogo ? (
              <img
                alt={specialty.communityLogo.title}
                src={specialty.communityLogo.file.url}
                style={{ maxHeight: '100px' }}
              />
            ) : null}
          </ImgContainerCol>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SmallerH2
              reverse
            >{`${specialty.title.trim()} community`}</SmallerH2>
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

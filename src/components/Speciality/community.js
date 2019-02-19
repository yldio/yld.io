import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../Common/BlueBG'
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

const CommunitySection = ({ logo, text, background, title }) =>
  text ? (
    <BlueBackground>
      <Trimmer>
        <TrimmedImage alt={background.title} src={background.file.url} />
        <Padding top={5} bottom={5}>
          <Row>
            <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
              {logo ? (
                <img
                  alt={logo.title}
                  src={logo.file.url}
                  style={{ maxHeight: '100px' }}
                />
              ) : null}
            </ImgContainerCol>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <SectionTitle
                small
                reverse
              >{`${title.trim()} community`}</SectionTitle>
              <BodyPrimary reverse muted>
                {text.content[0].content[0].value}
              </BodyPrimary>
            </Col>
          </Row>
        </Padding>
      </Trimmer>
    </BlueBackground>
  ) : null
export default CommunitySection

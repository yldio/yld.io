import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../Common/BlueBackground'
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

const CommunitySection = ({
  logo,
  text,
  backgroundTitle,
  backgroundUrl,
  logoTitle,
  logoUrl,
  title
}) =>
  text ? (
    <BlueBackground>
      <Trimmer>
        <TrimmedImage alt={backgroundTitle} src={backgroundUrl} />
        <Padding top={5} bottom={5}>
          <Row>
            <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
              {logo ? (
                <img
                  alt={logoTitle}
                  src={logoUrl}
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
                {text}
              </BodyPrimary>
            </Col>
          </Row>
        </Padding>
      </Trimmer>
    </BlueBackground>
  ) : null
export default CommunitySection

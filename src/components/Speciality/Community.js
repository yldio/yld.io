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
  communityText,
  communityBackgroundTitle,
  communityBackgroundUrl,
  communityLogoTitle,
  communityLogoUrl,
  title
}) =>
  communityText ? (
    <BlueBackground>
      <Trimmer>
        <TrimmedImage
          alt={communityBackgroundTitle}
          src={communityBackgroundUrl}
        />
        <Padding top={5} bottom={5}>
          <Row>
            <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
              {communityLogoTitle ? (
                <img
                  alt={communityLogoTitle}
                  src={communityLogoUrl}
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
                {communityText}
              </BodyPrimary>
            </Col>
          </Row>
        </Padding>
      </Trimmer>
    </BlueBackground>
  ) : null
export default CommunitySection

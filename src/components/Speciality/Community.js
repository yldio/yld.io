import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import breakpoint from 'styled-components-breakpoint'
import BlueBackground from '../Common/BlueBackground'
import styled from 'styled-components'
import Image from '../Common/Image'

const TrimmedImage = styled(Image)`
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
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const CommunitySection = ({
  communityText,
  communityBackgroundTitle,
  communityBackground,
  communityLogoTitle,
  communityLogo,
  title
}) =>
  communityText ? (
    <BlueBackground>
      <Trimmer>
        <TrimmedImage
          alt={communityBackgroundTitle}
          image={communityBackground}
        />
        <Wrapper>
          <Row>
            <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]}>
              {communityLogoTitle ? (
                <Image
                  alt={communityLogoTitle}
                  image={communityLogo}
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
        </Wrapper>
      </Trimmer>
    </BlueBackground>
  ) : null
export default CommunitySection

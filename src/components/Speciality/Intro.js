import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col, Grid } from '../grid'
import { SectionTitle, CardTitle, Subtitle, BodyPrimary } from '../Typography'
import BlueBackground from '../Common/BlueBackground'
import Image from '../Common/Image'

const IntroBorder = styled(Col)`
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const StyledBlueBackground = styled(BlueBackground)`
  padding-top: ${remcalc(36)};
  margin-top: -${remcalc(36)};
`

const StyledIntroRectangleInner = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallPhone', 'smallTablet')`
      padding-top: ${({ theme }) => theme.space[3]};
      padding-bottom: ${({ theme }) => theme.space[3]};
      padding-left: ${({ theme }) => theme.space[4]};
      padding-right: ${({ theme }) => theme.space[4]};
  `}
`

const IntroSectionPadding = styled.div`
  padding-top: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const IntroRectangle = ({ introTextTitle, introTextBody }) => (
  <IntroBorder width={[1, 1, 1, 1, 4 / 12]}>
    <StyledIntroRectangleInner>
      <Subtitle reverse noPadding>
        {introTextTitle}
      </Subtitle>
      <BodyPrimary muted reverse noPaddingTop>
        {introTextBody}
      </BodyPrimary>
    </StyledIntroRectangleInner>
  </IntroBorder>
)

const TopSectionRow = styled(Row)`
  ${breakpoint('smallPhone', 'smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const IntroSection = ({ speciality }) => (
  <StyledBlueBackground>
    <IntroSectionPadding>
      <Grid>
        <TopSectionRow>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Flex full column justifyCenter>
              <SectionTitle reverse as="h1">
                {speciality.title}
              </SectionTitle>
              <BodyPrimary reverse muted>
                {speciality.seoText}
              </BodyPrimary>
            </Flex>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Image
              alt={speciality.introGraphicTitle}
              image={speciality.introGraphicFile}
              style={{ maxHeight: '100%' }}
            />
          </Col>
        </TopSectionRow>
        <Row>
          <Col width={[1]}>
            <Padding top={2} bottom={2}>
              <CardTitle reverse noPadding>
                {speciality.introTitle}
              </CardTitle>
            </Padding>
          </Col>
        </Row>

        <Col width={[1]}>
          <Row>
            <IntroRectangle
              introTextTitle={speciality.introTextTitle1}
              introTextBody={speciality.introTextBody1}
            />
            <IntroRectangle
              introTextTitle={speciality.introTextTitle2}
              introTextBody={speciality.introTextBody2}
            />
            <IntroRectangle
              introTextTitle={speciality.introTextTitle3}
              introTextBody={speciality.introTextBody3}
            />
          </Row>
        </Col>
      </Grid>
    </IntroSectionPadding>
  </StyledBlueBackground>
)
export default IntroSection

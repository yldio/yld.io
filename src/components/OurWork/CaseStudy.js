import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H4, Paragraph } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const Speciality = styled(Paragraph).attrs({ muted: true })`
  // overwrite default padding on Paragraph component
  padding-bottom: 0;
`

const Title = H4.withComponent('h2')

const IntroSentence = styled(Paragraph).attrs({ fullWidth: true })`
  padding-bottom: 6px;
  ${breakpoint('tablet')`
    padding-bottom: 12px;
  `}
`

const FlexCol = styled(Col)`
  display: flex;
  ${breakpoint('tablet')`
    align-items: center;
  `}
`

const TitleSection = ({ speciality, title }) => (
  <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
    <Speciality>{speciality}</Speciality>
    <Title>{title}</Title>
  </Padding>
)

const InfoSection = ({ introSentence, title, slug }) => (
  <Fragment>
    <Padding top={1}>
      <IntroSentence fullWidth>{introSentence}</IntroSentence>
    </Padding>
    <StyledLink
      aria-label={`Learn more about ${title}`}
      to={`/case-study/${slug}`}
    >
      Learn more
    </StyledLink>
  </Fragment>
)

const CaseStudy = ({ caseStudy }) => {
  const { title, speciality, posterImage, slug } = caseStudy
  const introSentence = getIntroSentence(caseStudy)

  return (
    <Row>
      <Col width={[1, 1, 1, 1, 0, 0, 0]}>
        <TitleSection speciality={speciality} title={title} />
      </Col>
      <FlexCol width={1}>
        <Col px={[0]} width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
          <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
            <Image alt={posterImage.title} image={posterImage} />
          </Padding>
        </Col>
        <Col pr={[0]} width={[0, 0, 0, 0, 7 / 12, 6 / 12, 6 / 12]}>
          <TitleSection speciality={speciality} title={title} />
          <InfoSection introSentence={introSentence} slug={slug} />
        </Col>
      </FlexCol>
      <Col width={[1, 1, 1, 1, 0, 0, 0]}>
        <InfoSection introSentence={introSentence} title={title} slug={slug} />
      </Col>
    </Row>
  )
}

export default CaseStudy

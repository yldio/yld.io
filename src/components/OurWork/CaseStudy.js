import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H4, Paragraph } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const Title = H4.withComponent('h2')

const FlexCol = styled(Col)`
  display: flex;
  align-items: center;
`

const TitleSection = ({ speciality, title }) => (
  <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
    <Paragraph muted>{speciality}</Paragraph>
    <Title>{title}</Title>
  </Padding>
)

const InfoSection = ({ introSentence, title, slug }) => (
  <Fragment>
    <Padding top={1}>
      <Paragraph fullWidth>{introSentence}</Paragraph>
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

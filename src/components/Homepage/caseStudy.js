import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from '../grid'
import breakpoint from 'styled-components-breakpoint'
import { Margin, Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H2, Paragraph } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const ImageWrapper = styled(Col)`
  margin-top: ${remcalc(-5)};
  /* width: 100%; */
  max-width: ${remcalc(549)};
  height: auto;
  ${breakpoint('smallTablet')`
    padding-right: 0;
  `}

  ${breakpoint('tablet')`
    padding-left: 0;
  `}

  ${breakpoint('desktop')`
    max-width: ${remcalc(549)};
  `}
`

const WrapperRow = styled(Row)`
  ${breakpoint('smallTablet')`
    align-items: center;
  `};
`

const P = styled(Paragraph)`
  ${breakpoint('tablet')`
    margin-top: ${remcalc(12)};
  `}
`

const SubHeading = styled(Paragraph)`
  color: #757575;
  padding-bottom: 0;
  opacity: 0.7;
`

const TextWrapper = styled.div`
  ${breakpoint('desktop')`
    width: 431px;
    margin-left: auto;
  `}
`

const CaseStudy = ({ caseStudy, subHeading }) => (
  <WrapperRow>
    <Col width={[1, 1, 1, 1, 0]}>
      <SubHeading>{subHeading}</SubHeading>
      <Padding bottom={3}>
        <H2>{caseStudy.title}</H2>
      </Padding>
    </Col>
    <ImageWrapper width={[1, 1, 1, 1, 1 / 2]}>
      <Image alt={caseStudy.posterImage.title} image={caseStudy.posterImage} />
    </ImageWrapper>
    <Col width={[0, 0, 0, 0, 1 / 2]}>
      <TextWrapper>
        <SubHeading>{subHeading}</SubHeading>
        <H2 noTop>{caseStudy.title}</H2>
        <P>{getIntroSentence(caseStudy)}</P>
        <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
      </TextWrapper>
    </Col>
    <Col width={[1, 1, 1, 1, 0]}>
      <Margin top={3} />
      <P>{getIntroSentence(caseStudy)}</P>
      <StyledLink
        aria-label={`Learn more about ${caseStudy.title}`}
        to={`/case-study/${caseStudy.slug}`}
      >
        Learn more
      </StyledLink>
    </Col>
  </WrapperRow>
)

export default CaseStudy

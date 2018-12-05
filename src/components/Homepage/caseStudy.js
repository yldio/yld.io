import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from '../grid'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H2, Paragraph } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const ImageWrapper = styled(Col)`
  margin-top: ${remcalc(-5)};
  /* width: 100%; */
  max-width: ${remcalc(549)};
  height: auto;

  ${breakpoint('tablet')`
    padding-left: 0;
  `}

  ${breakpoint('desktop')`
    max-width: ${remcalc(549)};
  `}
`

const WrapperRow = styled(Row)`
  ${breakpoint('tablet')`
    align-items: center;
  `};
`

const P = styled(Paragraph)`
  margin-top: ${remcalc(12)};
`

const SubHeading = styled(Paragraph)`
  color: #757575;
  padding-bottom: 0;
  opacity: 0.7;
`

const ImageCol = styled(Col)`
  ${breakpoint('tablet')`
    padding-left: 0;
  `}
`

const TextWrapper = styled.div`
  ${breakpoint('desktop')`
    width: 431px;
    margin-left: auto;
  `}
`

const CaseStudy = ({ caseStudy, subHeading }) => (
  <WrapperRow>
    <ImageWrapper width={[1, 1, 1, 1 / 2, 1 / 2]}>
      <Image alt={caseStudy.posterImage.title} image={caseStudy.posterImage} />
    </ImageWrapper>
    <ImageCol width={[1, 1, 1, 1 / 2, 1 / 2]}>
      <TextWrapper>
        <SubHeading>{subHeading}</SubHeading>
        <H2 noTop>{caseStudy.title}</H2>

        <P>{getIntroSentence(caseStudy)}</P>
        <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
      </TextWrapper>
    </ImageCol>
  </WrapperRow>
)

export default CaseStudy

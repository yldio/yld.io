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
  max-width: 100%;
  height: auto;

  img {
    max-width: 100%;
    width: ${remcalc(526)};

    ${breakpoint('desktop')`
      max-width: 100%;
      width: ${remcalc(526)};
    `}
  }
`

const WrapperRow = styled(Row)``

const SubHeading = styled(Paragraph)`
  color: #757575;
  padding-bottom: 0;
  opacity: 0.7;
`

const TextWrapper = styled.div`
  ${breakpoint('tablet')`
    align-self: center;
    width: 431px;
  `}
`

const FlexCol = styled(Col)`
  display: flex;
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
    <Col width={[0, 0, 0, 0, 0, 0, 1 / 12]} />
    <FlexCol width={[0, 0, 0, 0, 5 / 12]}>
      <TextWrapper>
        <SubHeading>{subHeading}</SubHeading>
        <H2 noTop>{caseStudy.title}</H2>
        <Padding top={1.5}>
          <Paragraph fullWidth>{getIntroSentence(caseStudy)}</Paragraph>
          <Padding top={1}>
            <StyledLink to={`/case-study/${caseStudy.slug}`}>
              Learn more
            </StyledLink>
          </Padding>
        </Padding>
      </TextWrapper>
    </FlexCol>
    <Col width={[1, 1, 1, 1, 0]}>
      <Margin top={3} />
      <Paragraph fullWidth>{getIntroSentence(caseStudy)}</Paragraph>
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

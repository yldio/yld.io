import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Margin, Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import { H2, Paragraph } from '../Typography'

const ImageWrapper = styled(Col)`
  margin-top: ${remcalc(-5)};

  ${breakpoint('desktop')`
    position: absolute;
    left: 51.5%;
    padding-right: 0px;
    `}
`

const WrapperRow = styled(Row)`
  ${breakpoint('tablet')`
    min-height: ${remcalc(540)};
    align-items: center;
  `};
`

const P = styled(Paragraph)`
  margin-bottom: ${remcalc(9)};
`

const CaseStudy = ({ caseStudy }) => (
  <WrapperRow>
    <Col sm={12} xs={12} md={false}>
      <Padding bottom={{ mobile: 0, tablet: 3, desktop: 1 }}>
        <H2>{caseStudy.title}</H2>
      </Padding>
    </Col>
    <Col xs={false} sm={false} md={6}>
      <Margin bottom={1}>
        <H2>{caseStudy.title}</H2>
      </Margin>
      <P>
        {caseStudy.intro
          ? (caseStudy.intro || {}).introSentence
          : typeof caseStudy.introSentence === 'string'
            ? caseStudy.introSentence
            : (caseStudy.introSentence || {}).introSentence}
      </P>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
    </Col>
    <ImageWrapper xs={12} sm={12} md={6}>
      {caseStudy.posterImage ? (
        <img
          style={{ maxWidth: 549 }}
          alt={caseStudy.title}
          src={caseStudy.posterImage.file.url}
        />
      ) : null}
    </ImageWrapper>
    <Col xs={12} sm={12} md={false}>
      <Margin top={2} />
      <P>
        {caseStudy.intro
          ? (caseStudy.intro || {}).introSentence
          : typeof caseStudy.introSentence === 'string'
            ? caseStudy.introSentence
            : (caseStudy.introSentence || {}).introSentence}
      </P>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
    </Col>
  </WrapperRow>
)

export default CaseStudy

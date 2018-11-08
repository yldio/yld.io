import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Margin } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import { H2, Paragraph } from '../Typography'

const ImageWrapper = styled(Col)`
  margin-top: ${remcalc(-5)};
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
      <Margin bottom={1}>
        <H2>{caseStudy.title}</H2>
      </Margin>
    </Col>
    <Col xs={false} sm={false} md={6}>
      <Margin bottom={1}>
        <H2>{caseStudy.title}</H2>
      </Margin>
      <P>{caseStudy.body.content[0].content[0].value}</P>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
    </Col>
    <ImageWrapper xs={12} sm={12} md={6}>
      <img alt={caseStudy.title} src={caseStudy.posterImage.file.url} />
    </ImageWrapper>
    <Col xs={12} sm={12} md={false}>
      <Margin top={2} />
      <P>{caseStudy.body.content[0].content[0].value}</P>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
    </Col>
  </WrapperRow>
)

export default CaseStudy

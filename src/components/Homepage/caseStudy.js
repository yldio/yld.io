import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import StyledLink from '../styledLink'
import { H2, Paragraph } from '../Typography'

const ImageWrapper = styled(Col)`
  position: absolute;
  right: 0;
  margin-right: ${remcalc(-20)};
  height: ${remcalc(540)};
  width: ${remcalc(540)};
  padding: 0;
`

const WrapperRow = styled(Row)`
  min-height: ${remcalc(540)};
  align-items: center;
`

const CaseStudy = ({ caseStudy }) => (
  <WrapperRow>
    <Col xs={5}>
      <H2>{caseStudy.title}</H2>
      <Paragraph>{caseStudy.body.content[0].content[0].value}</Paragraph>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn More</StyledLink>
    </Col>
    <ImageWrapper xs={7}>
      <Flex
        justifyEnd
        alignCenter
        full
        style={{ background: `#${caseStudy.posterColor}` }}
      >
        <img alt={caseStudy.title} src={caseStudy.posterImage.file.url} />
      </Flex>
    </ImageWrapper>
  </WrapperRow>
)

export default CaseStudy

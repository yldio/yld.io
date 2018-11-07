import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Margin } from 'styled-components-spacing'
import Flex from 'styled-flex-component'
import StyledLink from '../styledLink'
import { H2, Paragraph } from '../Typography'

const ImageWrapper = styled(Col)`
  position: absolute;
  right: 0;
  height: ${remcalc(540)};
  width: ${remcalc(540)};
  padding: 0;
  margin-top: ${remcalc(-5)};
`

const WrapperRow = styled(Row)`
  min-height: ${remcalc(540)};
  align-items: center;
`

const P = styled(Paragraph)`
  margin-bottom: ${remcalc(9)};
`

const CaseStudy = ({ caseStudy }) => (
  <WrapperRow>
    <Col xs={6}>
      <Margin bottom={1}>
        <H2>{caseStudy.title}</H2>
      </Margin>
      <P>{caseStudy.body.content[0].content[0].value}</P>
      <StyledLink to={`/case-study/${caseStudy.slug}`}>Learn more</StyledLink>
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

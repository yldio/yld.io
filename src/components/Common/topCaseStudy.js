import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Flex from 'styled-flex-component'
import { Row, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Padding, Margin } from 'styled-components-spacing'
import { H1, H5, H6, Paragraph } from '../../components/Typography'
import SeoLinks from '../../components/Common/seoLinks'

const ImageWrapper = styled(Col)`
  max-height: ${remcalc(540)};
  width: ${remcalc(529)};
  ${breakpoint('desktop')`
      position: absolute;
      left: 58%;
      padding: 0;
  `}
`

const NoMobile = styled.section`
  display: none;

  ${breakpoint('tablet')`
    display: block;
  `};
`

const MetaData = ({ caseStudy }) => (
  <Flex>
    {caseStudy.specialities ? (
      <Margin right={2}>
        <Flex column>
          <H5 small bold noMargin noWrap>
            Technology used
          </H5>
          <Flex alignCenter wrap>
            <H6 noMargin>
              <SeoLinks items={caseStudy.specialities} />
            </H6>
          </Flex>
        </Flex>
      </Margin>
    ) : null}
    {caseStudy.services ? (
      <Flex column>
        <H5 small bold noMargin noWrap>
          Services provided
        </H5>
        <Flex alignCenter wrap>
          <H6 noMargin>
            <SeoLinks items={caseStudy.services} />
          </H6>
        </Flex>
      </Flex>
    ) : null}
  </Flex>
)

const CaseStudyTop = ({ caseStudy, introSentence }) => (
  <Row>
    <Col xs={12} sm={6}>
      <Flex full column justifyCenter>
        <H1 noTop>{caseStudy.title}</H1>
        <NoMobile>
          <MetaData caseStudy={caseStudy} />
        </NoMobile>
      </Flex>
    </Col>
    {caseStudy.posterImage && (
      <ImageWrapper sm={6} xs={12}>
        <img
          alt={caseStudy.title}
          src={caseStudy.posterImage.file.url}
          style={{ width: '100%' }}
        />
      </ImageWrapper>
    )}
    <Col xs={12} sm={false}>
      <Padding top={2}>
        <MetaData caseStudy={caseStudy} />
      </Padding>
    </Col>
    {introSentence && (
      // change padding 4 tablet + mobile
      <Col xs={12} sm={9} md={7}>
        <Padding top={7} bottom={4.5}>
          <Paragraph>{introSentence}</Paragraph>
        </Padding>
      </Col>
    )}
  </Row>
)

export default CaseStudyTop

import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import { Row, Col } from '../../components/grid'
import { Margin } from 'styled-components-spacing'
import { H1, H5 } from '../../components/Typography'
import SeoLinks from '../../components/Common/seoLinks'
import Image from '../../components/Common/Image'

const ImageWrapper = styled(Col)`
  ${breakpoint('smallTablet')`
    padding-right: ${remcalc(24)};
  `}
`

const ContentWrapper = styled(Col)`
  margin-left: auto;

  ${breakpoint('smallTablet')`
    padding-left: 0;
  `}
`

const NoMobile = styled.section`
  display: none;

  ${breakpoint('smallTablet')`
    display: block;
  `};
`

// @TODPO componentise
const MetaData = ({ caseStudy }) => (
  <Flex>
    {caseStudy.specialities ? (
      <Margin right={2}>
        <Flex column>
          <H5 noMargin noWrap>
            Technology used
          </H5>
          <Flex alignCenter wrap>
            <SeoLinks noMargin items={caseStudy.specialities} />
          </Flex>
        </Flex>
      </Margin>
    ) : null}
    {caseStudy.services ? (
      <Flex column>
        <H5 noMargin noWrap>
          Services provided
        </H5>
        <Flex alignCenter wrap>
          <SeoLinks noMargin items={caseStudy.services} />
        </Flex>
      </Flex>
    ) : null}
  </Flex>
)

const CaseStudyTop = ({ caseStudy }) => (
  <Row>
    {caseStudy.posterImage && (
      <ImageWrapper width={[1, 1, 1 / 2]}>
        <Image
          alt={caseStudy.posterImage.title}
          image={caseStudy.posterImage}
        />
      </ImageWrapper>
    )}
    <ContentWrapper width={[1, 1, 1, 1 / 2, 1 / 2, 5 / 12]}>
      <Flex full column justifyCenter>
        <H1>{caseStudy.title}</H1>
        <NoMobile>
          <MetaData caseStudy={caseStudy} />
        </NoMobile>
      </Flex>
    </ContentWrapper>
    {/* <Col width={[1, 1, 0]}>
      <Padding top={2}>
        <MetaData caseStudy={caseStudy} />
      </Padding>
    </Col> */}
  </Row>
)

export default CaseStudyTop

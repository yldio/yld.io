import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Flex from 'styled-flex-component'
import { Row, Col } from '../../components/grid'
import { Margin } from 'styled-components-spacing'
import { H1, H5, H6 } from '../../components/Typography'
import SeoLinks from '../../components/Common/seoLinks'
import Image from '../../components/Common/Image'

// const ImageWrapper = styled(Col)`
//   max-height: ${remcalc(540)};
//   width: ${remcalc(540)};
// `

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
          <H5 noMargin noWrap>
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
        <H5 noMargin noWrap>
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

const CaseStudyTop = ({ caseStudy }) => (
  <Row>
    {caseStudy.posterImage && (
      <Col width={[1, 1, 1 / 2]}>
        <Image
          alt={caseStudy.posterImage.title}
          image={caseStudy.posterImage}
        />
      </Col>
    )}
    <Col width={[1, 1, 1, 1, 5 / 12]} style={{ marginLeft: 'auto' }}>
      <Flex full column justifyCenter>
        <H1>{caseStudy.title}</H1>
        <NoMobile>
          <MetaData caseStudy={caseStudy} />
        </NoMobile>
      </Flex>
    </Col>
    {/* <Col width={[1, 1, 0]}>
      <Padding top={2}>
        <MetaData caseStudy={caseStudy} />
      </Padding>
    </Col> */}
  </Row>
)

export default CaseStudyTop

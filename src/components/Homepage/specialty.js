import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import SeoLinks from '../Common/seoLinks'
import { H2, H4, H6, Paragraph } from '../Typography'

const CardHeader = styled.header`
  padding: ${remcalc(24)} ${remcalc(36)} ${remcalc(22)} ${remcalc(36)};
  max-width: ${remcalc(475)};
  box-sizing: border-box;

  > div {
    max-width: ${remcalc(310)};
  }
`

const Title = styled(H4)`
  font-weight: 500;
`

const AnimatedLink = styled(Link)`
  > section {
    transition: all 250ms ease;
  }

  &:hover {
    section {
      transform: scale(0.97);
    }
  }
`

function isEven (value) {
  if (value % 2 === 0) return true
  else return false
}

const Specialty = ({ services }) => (
  <Row>
    {services.map((service, index) => (
      <Col key={service.id} xs={12} sm={6}>
        {!isEven(index) ? <Padding top={7} /> : null}
        <H2>{service.title}</H2>
        <Padding bottom={0.5}>
          <Paragraph>{service.introSentence.introSentence}</Paragraph>
        </Padding>
        <Row>
          <Col xs={7}>
            <H6>
              <SeoLinks items={service.homePageSpecialities} />
            </H6>
          </Col>
        </Row>
        <StyledLink to={`/${service.slug}`}>Learn more</StyledLink>
        <Padding bottom={1.5} />
        <AnimatedLink to={`/case-study/${service.caseStudies[0].slug}`}>
          <section
            style={{
              background: `#${service.caseStudies[0].posterColor}`
            }}
          >
            <CardHeader>
              <div>
                <Paragraph reverse muted>
                  Case study
                </Paragraph>
                <Title noMargin reverse>
                  {service.caseStudies[0].title}
                </Title>
              </div>
            </CardHeader>
            <Flex
              justifyCenter
              alignCenter
              style={{
                background: `#${service.caseStudies[0].posterColor}`,
                width: 475,
                height: 473,
                maxWidth: '100%'
              }}
            >
              <img
                alt={service.caseStudies[0].title}
                src={service.caseStudies[0].posterImage.file.url}
              />
            </Flex>
          </section>
        </AnimatedLink>
      </Col>
    ))}
  </Row>
)

export default Specialty

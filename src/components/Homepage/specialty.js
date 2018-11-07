import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import { H2, H6, H4, Paragraph } from '../Typography'

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
        <Paragraph>{service.introSentence.introSentence}</Paragraph>
        <Row>
          <Col xs={7}>
            <H6>
              {service.homePageSpecialities.map((s, i) => {
                const last = i + 1 === service.homePageSpecialities.length
                if (s.body) {
                  return (
                    <Link key={s.id} to={`/speciality/${s.slug}`}>
                      {s.title} {last ? '' : '/'}
                    </Link>
                  )
                }

                return `${s.title} ${last ? '' : '/'} `
              })}
            </H6>
          </Col>
        </Row>
        <StyledLink to={`/${service.slug}`}>Learn More</StyledLink>
        <Padding bottom={2} />
        <CardHeader
          style={{
            background: `#${service.caseStudies[0].posterColor}`
          }}
        >
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
            alt={service.caseStudies[0].posterColor.title}
            src={service.caseStudies[0].posterImage.file.url}
          />
        </Flex>
      </Col>
    ))}
  </Row>
)

export default Specialty

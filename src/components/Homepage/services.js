import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import Image from '../Common/Image'
import StyledLink from '../Common/StyledLink'
import SeoLinks from '../Common/seoLinks'
import { SectionTitle, CardTitle, BodyPrimary } from '../Typography'

const CardHeader = styled.header`
  padding: ${remcalc(24)} ${remcalc(36)} ${remcalc(22)} ${remcalc(36)};
  max-width: ${remcalc(475)};
  box-sizing: border-box;

  > div {
    max-width: ${remcalc(310)};
  }
`

const AnimatedLink = styled(Link)`
  > section {
    transition: transform ${props => props.theme.animations.normal} ease;
  }

  &:focus,
  &:hover {
    > section {
      transform: scale(0.97);
    }
  }
`

const ImageWrapper = styled.div`
  background: #${props => props.color};
  max-width: 100%;
`

const MasonryContainer = styled(Col)`
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;

  ${breakpoint('smallTablet')`
    display: block;
    column-count: 2;
    column-gap: 49px;
  `}
`

const orderMap = {
  0: 1,
  1: 3,
  2: 2,
  3: 4
}

const MasonryElement = styled.div`
  break-inside: avoid;
  order: ${({ index }) => orderMap[index]};

  ${breakpoint('desktop')`
    order: initial;
  `};
`

const Services = ({ services }) => (
  <Row pt={[3.5, 3.5, 3.5, 5]}>
    <MasonryContainer width={[1]}>
      {services.map((service, index, arr) => {
        return (
          service.introSentence && (
            <MasonryElement key={service.id} index={index}>
              {(arr.length === 2 && index === 1) ||
              (arr.length !== 2 && index === 2) ? (
                <Padding
                  top={{ smallPhone: 0, smallTablet: 6.5 }}
                  bottom={{ smallPhone: 0, smallTablet: 2 }}
                />
              ) : null}
              <SectionTitle>{service.title}</SectionTitle>
              <Padding top={1.5} bottom={0.5}>
                <BodyPrimary>{service.introSentence.introSentence}</BodyPrimary>
              </Padding>
              {service.homePageSpecialities &&
                service.homePageSpecialities.length && (
                  <Row>
                    <Col width={[1, 1, 1, 1, 1, 9 / 12]}>
                      <SeoLinks items={service.homePageSpecialities} />
                    </Col>
                  </Row>
                )}

              {service.pageReady ? (
                <Padding bottom={1.5}>
                  <StyledLink
                    to={`/${service.slug}`}
                    title={`Learn more about our ${service.title} service`}
                    data-event="learn-more-cta"
                  >
                    Learn more
                  </StyledLink>
                </Padding>
              ) : (
                <Padding bottom={1.5} />
              )}

              <AnimatedLink
                to={`/case-study/${service.caseStudies[0].slug}`}
                title={service.caseStudies[0].title}
              >
                <section
                  style={{
                    background: `#${service.caseStudies[0].posterColor}`
                  }}
                >
                  <CardHeader>
                    <section>
                      <BodyPrimary reverse muted>
                        Case study
                      </BodyPrimary>
                      <CardTitle reverse noPadding>
                        {service.caseStudies[0].title}
                      </CardTitle>
                    </section>
                  </CardHeader>
                  <ImageWrapper color={service.caseStudies[0].posterColor}>
                    <Image image={service.caseStudies[0].posterImage} />
                  </ImageWrapper>
                </section>
              </AnimatedLink>
              <Padding bottom={{ smallPhone: 4, smallTablet: 5 }} />
            </MasonryElement>
          )
        )
      })}
    </MasonryContainer>
  </Row>
)

export default Services

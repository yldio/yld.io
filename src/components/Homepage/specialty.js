import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import Image from '../Common/Image'
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

const PosterImage = styled.div`
  background: #${props => props.color};

  max-width: 100%;

  ${breakpoint('tablet')`
    height: 528px;
  `}

  ${breakpoint('desktop')`
    width: 475px;
    height: 473px;
  `}
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
    column-gap: 0;
    column-fill: auto;
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

const Specialty = ({ services }) => (
  <Row pt={5}>
    <MasonryContainer width={[1]}>
      {services.map((service, index, arr) => {
        return (
          service.introSentence && (
            <MasonryElement key={service.id} index={index}>
              {(arr.length === 2 && index === 1) ||
              (arr.length !== 2 && index === 2) ? (
                <Padding top={{ phone: 0, smallTablet: 6.5 }} bottom={2} />
              ) : null}
              <H2>{service.title}</H2>
              <Padding top={1.5} bottom={0.5}>
                <Paragraph>{service.introSentence.introSentence}</Paragraph>
              </Padding>
              {service.homePageSpecialities &&
                service.homePageSpecialities.length && (
                  <Row>
                    <Col width={[1, 1, 1, 1, 1, 9 / 12]}>
                      <H6>
                        <SeoLinks items={service.homePageSpecialities} />
                      </H6>
                    </Col>
                  </Row>
                )}

              {service.pageReady ? (
                <Padding bottom={1.5}>
                  <StyledLink to={`/${service.slug}`}>Learn more</StyledLink>
                </Padding>
              ) : (
                <Padding bottom={1.5} />
              )}

              <AnimatedLink to={`/case-study/${service.caseStudies[0].slug}`}>
                <section
                  style={{
                    background: `#${service.caseStudies[0].posterColor}`
                  }}
                >
                  <CardHeader>
                    <section>
                      <Paragraph reverse muted>
                        Case study
                      </Paragraph>
                      <Title noMargin reverse>
                        {service.caseStudies[0].title}
                      </Title>
                    </section>
                  </CardHeader>
                  <PosterImage color={service.caseStudies[0].posterColor}>
                    <Image
                      image={{
                        ...service.caseStudies[0].posterImage,
                        fluid: {}
                      }}
                    />
                  </PosterImage>
                </section>
              </AnimatedLink>
              <Padding bottom={5} />
            </MasonryElement>
          )
        )
      })}
    </MasonryContainer>
  </Row>
)

export default Specialty

import React from 'react'
import styled from 'styled-components'
import { Row } from '../grid'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import Image from '../Common/Image'
import StyledLink from '../styledLink'
import SeoLinks from '../Common/seoLinks'
import { AnimatedLink, CardHeader, PosterImage } from '../Common/animatedLink'
import { H2, H4, H6, Paragraph } from '../Typography'

const Title = styled(H4)`
  font-weight: 500;
`

const MasonryContainer = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 1.5rem;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;

  ${breakpoint('desktop')`
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
  <Row>
    <MasonryContainer width={[1]}>
      {services.map((service, index, arr) => {
        return (
          service.introSentence && (
            <MasonryElement key={service.id} index={index}>
              {(arr.length === 2 && index === 1) ||
              (arr.length !== 2 && index === 2) ? (
                <Padding top={{ phone: 0, tablet: 0, desktop: 7 }} bottom={2} />
              ) : null}
              <H2>{service.title}</H2>
              <Padding bottom={0.5}>
                <Paragraph>{service.introSentence.introSentence}</Paragraph>
              </Padding>
              {service.homePageSpecialities &&
                service.homePageSpecialities.length && (
                  <H6>
                    <SeoLinks items={service.homePageSpecialities} />
                  </H6>
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

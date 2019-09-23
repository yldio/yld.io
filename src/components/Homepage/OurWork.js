import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../grid'
import { SectionTitle, CardTitle, BodyPrimary } from '../Typography'
import Image from '../Common/Image'

const formatCaseStudies = caseStudies =>
  caseStudies.edges.map(caseStudyObject => {
    const caseStudy = caseStudyObject.node
    return {
      ...caseStudy,
      services: caseStudy.services
        .filter(service => service.title)
        .map(service => service.title)
    }
  })

const TitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const MobileOnlyRow = styled(Row)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const TabletOnlyRow = styled(Row)`
  display: none;
  ${breakpoint('smallTablet')`
    display: flex;
  `}

  ${breakpoint('desktop')`
    display: none;
  `}
`

const DesktopOnlyRow = styled(Row)`
  display: none;
  ${breakpoint('desktop')`
    display: flex;
  `}
`

const CardHeader = styled.header`
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[2]}`};
  max-width: ${({ theme }) => theme.spacing[475]};
  box-sizing: border-box;

  > div {
    max-width: ${({ theme }) => theme.spacing[310]};
  }

  ${breakpoint('tablet')`
    padding: ${({ theme }) => theme.spacing[2]};
  `}

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.spacing[30]};
  `}
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

const CaseStudy = ({ caseStudy }) => {
  const { title, posterImage, slug, posterColor, client } = caseStudy

  return (
    <AnimatedLink to={`/case-study/${slug}`} title={title}>
      <section
        style={{
          background: `#${posterColor}`
        }}
      >
        <CardHeader>
          <section>
            <BodyPrimary reverse muted>
              {client}
            </BodyPrimary>
            <CardTitle reverse noPadding>
              {title}
            </CardTitle>
          </section>
        </CardHeader>
        <ImageWrapper color={posterColor}>
          <Image image={posterImage} />
        </ImageWrapper>
      </section>
    </AnimatedLink>
  )
}

const OurWork = ({ data }) => {
  const {
    allContentfulNonTemplatedCaseStudyV2,
    allContentfulTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudy,
    contentfulOurWork: { caseStudies }
  } = data

  const allCaseStudies = [
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudyV2),
    ...formatCaseStudies(allContentfulTemplatedCaseStudy),
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudy)
  ]

  const displayOrderByIDs = caseStudies
    .filter(({ publish }) => publish)
    .map(({ id }) => id)

  const mappedFromContentfulOrder = displayOrderByIDs.map(orderedId =>
    allCaseStudies.find(cs => cs.id === orderedId)
  )
  const missingFromContentfulOrder = allCaseStudies.filter(
    cs => !displayOrderByIDs.includes(cs.id)
  )
  const orderedCaseStudies = [
    ...mappedFromContentfulOrder,
    ...missingFromContentfulOrder
  ]

  const mobileCaseStudies = orderedCaseStudies.slice(0, 3)
  const tabletCaseStudies = orderedCaseStudies.slice(0, 4)
  const desktopCaseStudies = orderedCaseStudies.slice(0, 6)

  return (
    <Grid>
      <Row>
        <TitleCol width={[1]}>
          <SectionTitle as="h1">Our Work</SectionTitle>
        </TitleCol>
      </Row>
      <MobileOnlyRow>
        {mobileCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={1}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </MobileOnlyRow>
      <TabletOnlyRow>
        {tabletCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={1 / 2}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </TabletOnlyRow>
      <DesktopOnlyRow>
        {desktopCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={4 / 12}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </DesktopOnlyRow>
    </Grid>
  )
}

const OurWorkSection = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulOurWork {
          caseStudies {
            ... on ContentfulNonTemplatedCaseStudy {
              id
              publish
            }
            ... on ContentfulNonTemplatedCaseStudyV2 {
              id
              publish
            }
            ... on ContentfulTemplatedCaseStudy {
              id
              publish
            }
          }
        }

        allContentfulNonTemplatedCaseStudyV2(
          filter: { publish: { eq: true } }
        ) {
          edges {
            node {
              slug
              title
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              posterColor
            }
          }
        }
        allContentfulNonTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <OurWork data={data} {...props} />}
  />
)

export default OurWorkSection

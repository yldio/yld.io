import React, { Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import CaseStudy from '../OurWork/CaseStudy'

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

const CaseStudyListCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

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

  return (
    <Grid>
      <Row>
        <TitleCol width={[1]}>
          <SectionTitle as="h1">Our Work</SectionTitle>
        </TitleCol>
      </Row>
      <Row>
        <CaseStudyListCol>
          {orderedCaseStudies.map(caseStudy => (
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </CaseStudyListCol>
      </Row>
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

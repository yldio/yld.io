import React, { Fragment } from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import Layout from '../components/layout'
import GreyBackground from '../components/Common/GreyBackground'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, DisplayTitle } from '../components/Typography'
import Hr from '../components/Common/Hr'
import Head from '../components/Common/Head'
import CaseStudy from '../components/OurWork/CaseStudy'

const FixedWidthDisplayTitle = styled(DisplayTitle)`
  max-width: 100%;
  ${breakpoint('smallTablet')`
    max-width: ${remcalc(593)};
  `}
  ${breakpoint('tablet')`
    max-width: ${remcalc(785)};
  `}
`

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

const ourWork = {
  title: 'Our Work',
  description:
    "We make work that we’re proud to stand behind and celebrate. That way we’re sure our clients love it from the moment we start collaborating to well after we've left",
  seoTitle: 'A collection of case studies'
}

const OurWork = ({ data }) => {
  const {
    allContentfulTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudyV2
  } = data

  const allCaseStudies = [
    ...formatCaseStudies(allContentfulTemplatedCaseStudy),
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudy),
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudyV2)
  ]

  const nonDisplayed = ['central-working']

  const caseStudies = allCaseStudies.filter(cs =>
    nonDisplayed.some(nd => !cs.slug.includes(nd))
  )

  const page = allContentfulTemplatedCaseStudy.edges[0].node

  return (
    <Layout>
      <Head
        page={{
          ...page,
          title: ourWork.title,
          seoTitle: ourWork.seoTitle,
          seoMetaDescription: ourWork.description
        }}
      />
      <Grid>
        <Row>
          <Col>
            <Padding
              top={{
                smallPhone: 3.5,
                tablet: 4
              }}
              bottom={{
                smallPhone: 3.5,
                tablet: 5
              }}
            >
              <SectionTitle as="h1">{ourWork.title}</SectionTitle>
              <FixedWidthDisplayTitle regular textLight>
                {ourWork.description}
              </FixedWidthDisplayTitle>
            </Padding>
          </Col>
        </Row>
      </Grid>
      <GreyBackground>
        <Grid>
          {caseStudies.map((caseStudy, index) => {
            const isFirstCaseStudy = index === 0
            const isLastCaseStudy = index === caseStudies.length - 1
            const isMiddleCaseStudy = !!(!isFirstCaseStudy && !isLastCaseStudy)
            return (
              <Fragment key={index}>
                {isFirstCaseStudy && (
                  <Fragment>
                    <Padding
                      top={{ smallPhone: 3, smallTablet: 3.5, tablet: 4 }}
                      bottom={{ smallPhone: 2, smallTablet: 3 }}
                    >
                      <CaseStudy caseStudy={caseStudy} />
                    </Padding>
                    <Hr />
                  </Fragment>
                )}
                {isMiddleCaseStudy && (
                  <Fragment>
                    <Padding top={3} bottom={{ smallPhone: 2, smallTablet: 3 }}>
                      <CaseStudy caseStudy={caseStudy} />
                    </Padding>
                    <Hr />
                  </Fragment>
                )}
                {isLastCaseStudy && (
                  <Padding
                    top={3}
                    bottom={{ smallPhone: 3.5, smallTablet: 3.5, tablet: 4 }}
                  >
                    <CaseStudy caseStudy={caseStudy} />
                  </Padding>
                )}
              </Fragment>
            )
          })}
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

const OurWorkPage = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence
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
              seoTitle
              seoMetaDescription
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
        allContentfulNonTemplatedCaseStudyV2(
          filter: { publish: { eq: true } }
        ) {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
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

export default OurWorkPage

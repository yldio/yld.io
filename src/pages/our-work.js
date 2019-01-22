import React, { Fragment } from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import Layout from '../components/layout'
import GreyBackground from '../components/GreyBackgroundWithoutOffset'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitleH1, H3 } from '../components/Typography'
import Hr from '../components/Common/Hr'
import CaseStudy from '../components/OurWork/CaseStudy'

const SubHeading = styled(H3)`
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

const OurWork = ({ data }) => {
  const {
    site,
    allContentfulTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudy
  } = data

  const engineeringCaseStudies = formatCaseStudies(
    allContentfulTemplatedCaseStudy
  )
  const designCaseStudies = formatCaseStudies(
    allContentfulNonTemplatedCaseStudy
  )
  const caseStudies = engineeringCaseStudies.concat(designCaseStudies)

  const page = allContentfulTemplatedCaseStudy.edges[0].node

  return (
    <Layout backgroundColor="grey">
      <Helmet
        title={`${site.siteMetadata.title}  ${
          page.title ? '- ' + page.title : ''
        } ${page.seoTitle ? '- ' + page.seoTitle : ''} `}
        meta={[
          {
            name: 'description',
            content: page.seoMetaDescription
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
      <GreyBackground>
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
                <SectionTitleH1>Our Work</SectionTitleH1>
                <SubHeading as="h2" regular>
                  We make work that we’re proud to stand behind and celebrate.
                  That way we’re sure our clients love it too.
                </SubHeading>
              </Padding>
            </Col>
          </Row>
        </Grid>
      </GreyBackground>
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
    </Layout>
  )
}

const OurWorkPage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
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
      }
    `}
    render={data => <OurWork data={data} {...props} />}
  />
)

export default OurWorkPage

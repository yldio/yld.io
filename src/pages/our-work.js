import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'

import Layout from '../components/layout'
import { Grid, Row, Col } from '../components/grid'
import { H1, H3 } from '../components/Typography'
import CaseStudy from '../components/Homepage/caseStudy'

const SubHeading = H3.withComponent('h2')

const GreyDiv = styled.div`
  background-color: ${props => props.theme.colors.greyBg};
`

const OurWork = ({ data }) => {
  const { site, allContentfulCaseStudy, allContentfulGenericCaseStudy } = data
  const engineeringCaseStudies = allContentfulCaseStudy.edges.map(
    caseStudy => caseStudy.node
  )
  const designCaseStudies = allContentfulGenericCaseStudy.edges.map(
    caseStudy => caseStudy.node
  )
  const caseStudies = engineeringCaseStudies.concat(designCaseStudies)
  const page = allContentfulCaseStudy.edges[0].node

  return (
    <Layout>
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
      <GreyDiv>
        <Grid>
          <Row>
            <Col width={[1, 11 / 12, 9 / 12, 9 / 12]}>
              <Padding
                top={{
                  smallPhone: 3.5,
                  smallTablet: 3.5,
                  largeTablet: 4,
                  desktop: 4
                }}
                bottom={5}
              >
                <H1>Our Work</H1>
                <SubHeading regular>
                  We make work that we’re proud to stand behind and celebrate.
                  That way we’re sure our clients love it too.
                </SubHeading>
              </Padding>
            </Col>
          </Row>
        </Grid>
      </GreyDiv>
      <Grid>
        <Row>
          <Col>
            {caseStudies.map((caseStudy, index) => {
              const isFirstCaseStudy = index === 0
              const isLastCaseStudy = index === caseStudies.length - 1
              const isMiddleCaseStudy = !!(
                !isFirstCaseStudy && !isLastCaseStudy
              )
              return (
                <Fragment key={index}>
                  {isFirstCaseStudy && (
                    <Fragment>
                      <Padding top={4} bottom={3}>
                        <CaseStudy
                          caseStudy={caseStudy}
                          subHeading={caseStudy.speciality}
                        />
                      </Padding>
                      <hr />
                    </Fragment>
                  )}
                  {isMiddleCaseStudy && (
                    <Fragment>
                      <Padding top={3} bottom={3}>
                        <CaseStudy
                          caseStudy={caseStudy}
                          subHeading={caseStudy.speciality}
                        />
                      </Padding>
                      <hr />
                    </Fragment>
                  )}
                  {isLastCaseStudy && (
                    <Padding top={3} bottom={4}>
                      <CaseStudy
                        caseStudy={caseStudy}
                        subHeading={caseStudy.speciality}
                      />
                    </Padding>
                  )}
                </Fragment>
              )
            })}
          </Col>
        </Row>
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
        allContentfulCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              introSentence
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
              }
              posterColor
            }
          }
        }
        allContentfulGenericCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
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

import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { H2, H3, H5 } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import CaseStudy from '../components/Homepage/caseStudy'
import SeoLinks from '../components/Common/seoLinks'
import WorkStages from '../components/Service/work-stage/index'
import GreyBackground from '../components/GreyBG'

const Title = styled(H3.withComponent('h1'))`
  font-weight: normal;
  ${breakpoint('smallTablet')`
    width: 593px;
    font-size: 26px;
    line-height: 30px;
  `}

  ${breakpoint('tablet')`
    width: inherit;
  `}
`

const WeWorkWithPadding = styled.div`
  padding-top: ${props => (props.index === 1 ? remcalc(36) : remcalc(24))};
  ${breakpoint('tablet')`
    padding-top: ${props => remcalc(props.index * 72)};
  `}
`

const Service = ({ data }) => {
  const service = data.allContentfulService.edges[0].node
  const site = data.site
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          service.title ? '- ' + service.title : ''
        } ${service.seoTitle ? '- ' + service.seoTitle : ''} `}
        meta={[{ name: 'description', content: service.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid>
        <Row>
          <Col width={[1]}>
            <Padding bottom={{ smallPhone: 3, smallTablet: 0, tablet: 3 }}>
              <CaseStudy
                caseStudy={service.caseStudies[0]}
                subHeading="Featured work"
              />
            </Padding>
          </Col>
        </Row>
      </Grid>

      <GreyBackground>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1, 9 / 12]}>
              <Padding
                top={{ smallPhone: 3, smallTablet: 4 }}
                bottom={{ smallPhone: 0, smallTablet: 2 }}
              >
                <Title>
                  {service.mainPageIntroSentence.mainPageIntroSentence}
                </Title>
              </Padding>
            </Col>
          </Row>
        </Grid>
      </GreyBackground>
      <GreyBackground style={{ background: '#090329' }}>
        <WorkStages
          title={service.workStagesTitle}
          workStages={service.workStages}
          image={service.graphic}
        />
      </GreyBackground>
      <GreyBackground>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallTablet: 3.5 }}
        >
          <Grid>
            <Row>
              <Col width={[1]}>
                <H2>We work with</H2>
              </Col>
            </Row>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                <WeWorkWithPadding index={1}>
                  <H5>{service.specialityAreaTitle1}</H5>
                  <SeoLinks items={service.specialityAreaItems1} />
                </WeWorkWithPadding>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                <WeWorkWithPadding index={2}>
                  <H5>{service.specialityAreaTitle2}</H5>
                  <SeoLinks items={service.specialityAreaItems2} />
                </WeWorkWithPadding>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {service.specialityAreaTitle3 && (
                  <WeWorkWithPadding index={3}>
                    <H5>{service.specialityAreaTitle3}</H5>
                    <SeoLinks items={service.specialityAreaItems3} />
                  </WeWorkWithPadding>
                )}
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {service.specialityAreaTitle4 && (
                  <WeWorkWithPadding index={4}>
                    <H5>{service.specialityAreaTitle4}</H5>
                    <SeoLinks items={service.specialityAreaItems4} />
                  </WeWorkWithPadding>
                )}
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GreyBackground>
      <Grid>
        {service.bottomCaseStudy ? (
          <Padding
            top={{ smallPhone: 3.5, smallTablet: 6 }}
            bottom={{ smallPhone: 3.5, smallTablet: 5 }}
          >
            <CaseStudy
              caseStudy={service.bottomCaseStudy}
              subHeading="Featured work"
            />
          </Padding>
        ) : null}
      </Grid>
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulService(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          seoTitle
          seoMetaDescription
          mainPageIntroSentence {
            mainPageIntroSentence
          }
          graphic {
            fluid(maxWidth: 680) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            title
            file {
              url
            }
          }
          bottomCaseStudy {
            title
            slug
            introSentence
            posterImage {
              title
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_tracedSVG
              }
              file {
                url
              }
            }
            posterColor
          }
          caseStudies {
            ... on ContentfulCaseStudy {
              title
              slug
              introSentence
              posterColor
              posterImage {
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
                title
                file {
                  url
                }
              }
            }
            ... on ContentfulGenericCaseStudy {
              title
              slug
              intro: introSentence {
                introSentence
              }
              posterColor
              posterImage {
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
                title
                file {
                  url
                }
              }
            }
          }
          workStagesTitle
          workStagesImage {
            title
            fluid(maxWidth: 680) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            file {
              url
              fileName
              contentType
            }
          }
          workStages {
            id
            title
            displayType
            alternativeTitle
            alternativeWorkStages {
              title
              alternativeTitle
              sectionTitle1
              sectionTitle2
              sectionTitle3
              sectionTitle4
              sectionTitle5
              sectionIcon1 {
                title
                file {
                  url
                }
              }
              sectionIcon2 {
                title
                file {
                  url
                }
              }
              sectionIcon3 {
                title
                file {
                  url
                }
              }
              sectionIcon4 {
                title
                file {
                  url
                }
              }
              sectionIcon5 {
                title
                file {
                  url
                }
              }
              sectionBody1 {
                sectionBody1
              }
              sectionBody2 {
                sectionBody2
              }
              sectionBody3 {
                sectionBody3
              }

              sectionBody4 {
                sectionBody4
              }

              sectionBody5 {
                sectionBody5
              }
            }
            sectionTitle1
            sectionTitle2
            sectionTitle3
            sectionTitle4
            sectionTitle5
            sectionIcon1 {
              title
              file {
                url
              }
            }
            sectionIcon2 {
              title
              file {
                url
              }
            }
            sectionIcon3 {
              title
              file {
                url
              }
            }
            sectionIcon4 {
              title
              file {
                url
              }
            }
            sectionIcon5 {
              title
              file {
                url
              }
            }
            sectionBody1 {
              sectionBody1
            }
            sectionBody2 {
              sectionBody2
            }
            sectionBody3 {
              sectionBody3
            }

            sectionBody4 {
              sectionBody4
            }

            sectionBody5 {
              sectionBody5
            }
          }
          specialityAreaTitle1
          specialityAreaItems1 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle2
          specialityAreaItems2 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle3
          specialityAreaItems3 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle4
          specialityAreaItems4 {
            id
            slug
            title
            body {
              nodeType
            }
          }
        }
      }
    }
  }
`

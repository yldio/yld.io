import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../../components/grid'
import { H2, Paragraph } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import Layout from '../../components/layout'
import GrayBackground from '../../components/GrayBG'
// import Image from '../../components/Common/Image'
import { makeText } from '../../utils/makeText'

import deployment from '../../images/case-study/joyent/app_deployment.png'
import picture from '../../images/case-study/joyent/big_picture.png'
import form from '../../images/case-study/joyent/form_editing_alert.png'
import metric1 from '../../images/case-study/joyent/metric_1.png'
import metric2 from '../../images/case-study/joyent/metric_2.png'
import metric3 from '../../images/case-study/joyent/metric_3.png'
import metric4 from '../../images/case-study/joyent/metric_4.png'
import navigation from '../../images/case-study/joyent/navigation.png'
import signOn from '../../images/case-study/joyent/single_sign_on.png'
import topology from '../../images/case-study/joyent/topology.png'

// const MobileOnly = styled.div`
//   ${props => breakpoint(props.tablet ? 'tablet' : 'smallTablet')`
//       display: none;
//     `}
// `

// const NoMobile = styled.div`
//   display: none;
//   ${props => breakpoint(props.tablet ? 'tablet' : 'smallTablet')`
//       display: inherit;
//     `}
// `

const IntroSentenceCol = styled(Col)`
  margin-left: auto;
  ${breakpoint('smallTablet')`
    padding-left: 0;
  `}
`

const MetricsCol = styled(Col)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${remcalc(32)};

  ${breakpoint('smallTablet')`
      grid-template-columns: repeat(4, 1fr);
      max-width: 80%;
      margin: auto;
  `}
`

const IndexPage = ({
  data: { allContentfulGenericCaseStudy: content, site }
}) => {
  const caseStudy = content.edges[0].node
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          content.title ? '- ' + content.title : ''
        } ${content.seoTitle ? '- ' + content.seoTitle : ''} `}
        meta={[{ name: 'description', content: content.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid>
        <CaseStudyTop caseStudy={caseStudy} />
        <Padding top={{ smallPhone: 3.5, tablet: 5 }} />
        <Row>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <H2>The challenge</H2>
          </Col>
          <IntroSentenceCol width={[1, 1, 1, 1, 1 / 2]}>
            <Paragraph fullWidth>
              {caseStudy.introSentence.introSentence}
            </Paragraph>
            {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
              <Paragraph fullWidth key={i}>
                {p}
              </Paragraph>
            ))}
          </IntroSentenceCol>
        </Row>
        <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
      </Grid>
      <GrayBackground noTop>
        <Padding
          top={{ smallPhone: 3.5, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 5 / 12]}>
                <H2>Single sign-on</H2>
                {makeText(caseStudy.genericText2.genericText2).map((p, i) => (
                  <Paragraph fullWidth key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
            <Row>
              <Col width={[1]}>
                <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                  <img src={signOn} alt="single sign on" />
                </Padding>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <Padding top={{ smallPhone: 3, tablet: 4 }} bottom={30}>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <H2>Navigation</H2>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                <Paragraph fullWidth key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                <img src={navigation} alt="single sign on" />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <Padding>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <H2>App deployment</H2>
              {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                <Paragraph fullWidth key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                <img src={deployment} alt="single sign on" />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <GrayBackground noTop>
        <Padding
          top={{ smallPhone: 3.5, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 5 / 12]}>
                <H2>Topology</H2>
                {makeText(caseStudy.genericText6.genericText6).map((p, i) => (
                  <Paragraph fullWidth key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
              <Col width={[1, 1, 1, 1, 7 / 12]}>
                <img src={topology} alt="topology view" />
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <Padding top={{ smallPhone: 3, tablet: 4 }} bottom={30}>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <H2>The big picture</H2>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText7.genericText7).map((p, i) => (
                <Paragraph fullWidth key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                <img src={picture} alt="dashboard" />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <GrayBackground noTop>
        <Padding
          top={{ smallPhone: 3.5, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <H2>Metrics visualisation</H2>
              </Col>
              <IntroSentenceCol width={[1, 1, 1, 1, 1 / 2]}>
                {makeText(caseStudy.genericText8.genericText8).map((p, i) => (
                  <Paragraph fullWidth key={i}>
                    {p}
                  </Paragraph>
                ))}
              </IntroSentenceCol>
            </Row>
            <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
              <Row>
                <MetricsCol width={[1, 1, 1, 1, 1]}>
                  <img src={metric1} alt="metrics1" />
                  <img src={metric2} alt="metrics1" />
                  <img src={metric3} alt="metrics1" />
                  <img src={metric4} alt="metrics1" />
                </MetricsCol>
              </Row>
            </Padding>
          </Grid>
        </Padding>
      </GrayBackground>
      <Padding
        top={{ smallPhone: 3.5, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <H2>Monitoring and alerting</H2>
              {makeText(caseStudy.genericText9.genericText9).map((p, i) => (
                <Paragraph fullWidth key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                <img src={form} alt="Monitoring and alerting" />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      {caseStudy.relatedCaseStudy ? (
        <Grid>
          <Row>
            <Col width={[1, 1, 1]}>
              <Padding top={4} bottom={2}>
                <Paragraph>More of our work</Paragraph>
              </Padding>
            </Col>
          </Row>

          <Padding bottom={5}>
            <CaseStudyBottom caseStudy={caseStudy.relatedCaseStudy} />
          </Padding>
        </Grid>
      ) : null}
    </Layout>
  )
}

export const query = graphql`
  {
    # travel: file(relativePath: { eq: "case-study/beyond_photography.png" }) {
    #   publicURL
    #   childImageSharp {
    #     fluid {
    #       ...GatsbyImageSharpFluid
    #     }
    #   }
    # }
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGenericCaseStudy(
      filter: { slug: { eq: "joyent-bringing-application-awareness-to-cloud" } }
    ) {
      edges {
        node {
          relatedCaseStudy {
            title
            slug
            introSentence
            posterImage {
              fluid(maxWidth: 550) {
                ...GatsbyContentfulFluid_tracedSVG
              }
              title
              file {
                url
              }
            }
            posterColor
          }
          slug
          title
          posterImage {
            fluid(maxWidth: 550) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            title
            file {
              url
            }
          }
          introSentence {
            id
            introSentence
          }
          genericText1 {
            id
            genericText1
          }
          genericText2 {
            id
            genericText2
          }
          genericText3 {
            id
            genericText3
          }
          genericText4 {
            id
            genericText4
          }
          genericText5 {
            id
            genericText5
          }
          genericText6 {
            id
            genericText6
          }
          genericText7 {
            id
            genericText7
          }
          genericText8 {
            id
            genericText8
          }
          genericText9 {
            id
            genericText9
          }
          services {
            ... on ContentfulService {
              title
              id
            }
            ... on ContentfulSpeciality {
              title
              id
            }
          }
          posterColor
          seoTitle
          seoMetaDescription
        }
      }
    }
  }
`

export default IndexPage

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding, Margin } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import { H2, Paragraph } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import Layout from '../../components/layout'
import GrayBackground from '../../components/GrayBG'
import landscape from '../../images/case-study/at_the_heart_of_a_story.svg'
import Image from '../../components/Common/Image'
import { makeText } from '../../utils/makeText'

const ImageWrapper = styled.div`
  ${breakpoint('desktop')`
      max-width: 540px;
  `}
`

const GradientGridNoMobile = styled(Grid)`
  background-image: linear-gradient(to top, #0c1835, #050a18);
  display: none;
  ${breakpoint('smallTablet')`
    display: inherit;
  `}
`

const GradientBackgroundMobileOnly = styled.div`
  background-image: linear-gradient(to top, #0c1835, #050a18);
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const IntroSentenceCol = styled(Col)`
  margin-left: auto;
  ${breakpoint('smallTablet')`
    padding-left: 0;
  `}
`

const GradientContent = ({ text, image }) => (
  <Fragment>
    <Row>
      <Col width={[1, 1, 1]}>
        <Margin top={3} bottom={3}>
          <H2 reverse>Beyond photography</H2>
        </Margin>
        <Margin bottom={1}>
          {makeText(text).map((p, i) => (
            <Paragraph muted reverse padded key={i}>
              {p}
            </Paragraph>
          ))}
        </Margin>
      </Col>
    </Row>
    <Row>
      <Col width={[1, 1, 1]}>
        <ImageWrapper>
          <Image image={image} alt="Image of a travel itinerary" />
        </ImageWrapper>
      </Col>
    </Row>
  </Fragment>
)
const IndexPage = ({
  data: { allContentfulGenericCaseStudy: content, site, travel }
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
          <IntroSentenceCol width={[1, 1, 1, 1, 1 / 2]}>
            <Paragraph fullWidth>
              {caseStudy.introSentence.introSentence}
            </Paragraph>
          </IntroSentenceCol>
        </Row>
        <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
      </Grid>

      <GrayBackground noTop>
        <Padding top={{ smallPhone: 3, tablet: 4 }} bottom={30}>
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 5 / 12]}>
                <H2>At the heart of a photo is a story</H2>
              </Col>
            </Row>
            <Row>
              <Col width={[1, 1, 1, 1, 8 / 12]}>
                <Margin top={3}>
                  <Flex justifyCenter alignCenter>
                    <img src={landscape} alt="image representing travel" />
                  </Flex>
                </Margin>
              </Col>
            </Row>
            <Row>
              <Col width={[1, 1, 1]}>
                <Margin top={3}>
                  {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
                    <Paragraph padded key={i}>
                      {p}
                    </Paragraph>
                  ))}
                </Margin>
              </Col>
            </Row>
          </Grid>
        </Padding>

        <GradientGridNoMobile>
          <GradientContent
            text={caseStudy.genericText2.genericText2}
            image={travel.childImageSharp}
          />
        </GradientGridNoMobile>
      </GrayBackground>

      <GradientBackgroundMobileOnly>
        <Grid>
          <GradientContent
            text={caseStudy.genericText2.genericText2}
            image={travel.childImageSharp}
          />
        </Grid>
      </GradientBackgroundMobileOnly>

      <Margin bottom={6} />
      <Grid>
        <Padding top={2}>
          <Row>
            <Col xs={12} sm={12} md={5}>
              <H2>Exploring the story</H2>
            </Col>
            <Col xs={12} sm={12} md={7}>
              {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>

      <GrayBackground topOffset={-300}>
        <Padding top={5} bottom={2}>
          <Grid>
            <Row>
              <Col width={[1]}>
                <div className="video-container">
                  <iframe
                    width="844"
                    height="480"
                    src="https://www.youtube.com/embed/MPPk-BkImsc"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        </Padding>
        <Grid>
          <Padding top={5} bottom={3}>
            <Row>
              <Col xs={12} sm={12} md={5}>
                <H2>Out in the wild</H2>
              </Col>
              <Col xs={12} sm={12} md={7}>
                {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GrayBackground>
      {caseStudy.relatedCaseStudy ? (
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
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
    travel: file(relativePath: { eq: "case-study/beyond_photography.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 540) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGenericCaseStudy(
      filter: { slug: { eq: "canon-giving-stories-a-new-form" } }
    ) {
      edges {
        node {
          relatedCaseStudy {
            title
            slug
            introSentence {
              introSentence
            }
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
          services {
            ... on ContentfulService {
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

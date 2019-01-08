import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding, Margin } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../../components/grid'
import { H2, Paragraph } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import Layout from '../../components/layout'
import GreyBackground from '../../components/GreyBG'
import landscape from '../../images/case-study/at_the_heart_of_a_story.svg'
import Image from '../../components/Common/Image'
import { makeText } from '../../utils/makeText'

const MobileOnly = styled.div`
  ${props => breakpoint(props.tablet ? 'tablet' : 'smallTablet')`
      display: none;
    `}
`

const NoMobile = styled.div`
  display: none;
  ${props => breakpoint(props.tablet ? 'tablet' : 'smallTablet')`
      display: inherit;
    `}
`

const CenteredCol = styled(Col)`
  margin: 0 auto;
`

const GradientBackground = styled.div`
  background-image: linear-gradient(to top, #0c1835, #050a18);
`

const GradientGrid = styled(GradientBackground.withComponent(Grid))`
  ${breakpoint('tablet')`
    width: 73.5%;
  `}

  ${breakpoint('desktop')`
    width: 71%;
  `}
`

const PaddedParagraph = styled(Paragraph)`
  padding: ${remcalc(12)} 0;
`

const FirstParagraphCol = styled(Col)`
  margin-left: auto;
  ${breakpoint('smallTablet')`
    padding-left: 0;
  `}
`

const RightAlignedCol = styled(Col)`
  ${breakpoint('smallTablet')`
    margin-left: auto;
  `}
`

const BrAtTablet = styled.br`
  display: none;
  ${breakpoint('tablet')`
    display: initial;
  `}
`

const GradientContent = ({ text, image }) => (
  <Fragment>
    <Row>
      <CenteredCol width={[1, 1, 1, 8 / 12, 7.7 / 12, 7.43 / 12]}>
        <Margin top={3} bottom={{ smallPhone: 3, tablet: 1 }}>
          <H2 reverse>
            Beyond <BrAtTablet /> photography
          </H2>
        </Margin>
      </CenteredCol>
    </Row>
    <Row>
      <CenteredCol width={[1, 1, 1, 8 / 12, 7.7 / 12, 7.43 / 12]}>
        <Margin bottom={{ smallPhone: 1, tablet: 60 }}>
          {makeText(text).map((p, i) => (
            <Paragraph muted reverse padded fullWidth key={i}>
              {p}
            </Paragraph>
          ))}
        </Margin>
      </CenteredCol>
    </Row>
    <Row>
      <CenteredCol width={[1, 1, 1, 8 / 12, 7.7 / 12, 7.43 / 12]}>
        <Image image={image} alt="Image of a travel itinerary" />
      </CenteredCol>
    </Row>
  </Fragment>
)

const Video = () => (
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
          <FirstParagraphCol width={[1, 1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
              <Paragraph fullWidth key={i}>
                {p}
              </Paragraph>
            ))}
          </FirstParagraphCol>
        </Row>
        <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
      </Grid>

      <GreyBackground>
        <Padding top={{ smallPhone: 3, tablet: 4 }} bottom={30}>
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1 / 2]}>
                <H2>At the heart of a photo is a story</H2>
              </Col>
            </Row>
            <Row>
              <CenteredCol width={[1, 1, 1, 8 / 12]}>
                <Margin top={3}>
                  <Flex justifyCenter alignCenter>
                    <img src={landscape} alt="image representing travel" />
                  </Flex>
                </Margin>
              </CenteredCol>
            </Row>
            <Row>
              <RightAlignedCol width={[1, 1, 1, 1 / 2]}>
                <Margin top={3}>
                  {makeText(caseStudy.genericText2.genericText2).map((p, i) => (
                    <Paragraph padded fullWidth key={i}>
                      {p}
                    </Paragraph>
                  ))}
                </Margin>
              </RightAlignedCol>
            </Row>
          </Grid>
        </Padding>

        <NoMobile tablet>
          <GradientGrid>
            <GradientContent
              text={caseStudy.genericText3.genericText3}
              image={travel.childImageSharp}
            />
          </GradientGrid>
        </NoMobile>
      </GreyBackground>

      <MobileOnly tablet>
        <GradientBackground>
          <Grid>
            <GradientContent
              text={caseStudy.genericText3.genericText3}
              image={travel.childImageSharp}
            />
          </Grid>
        </GradientBackground>
      </MobileOnly>

      <Grid>
        <Padding top={3.5} bottom={3}>
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <H2>Exploring the story</H2>
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                <PaddedParagraph key={i}>{p}</PaddedParagraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>

      <MobileOnly>
        <Video />
      </MobileOnly>

      <GreyBackground topMargin topOffset={-150}>
        <NoMobile>
          <Padding top={{ smallTablet: 0, tablet: 3 }} bottom={5}>
            <Grid>
              <Row>
                <Col width={[1]}>
                  <Video />
                </Col>
              </Row>
            </Grid>
          </Padding>
        </NoMobile>
        <Grid>
          <Padding
            top={{ smallPhone: 4, smallTablet: 1 }}
            bottom={{ smallPhone: 3, smallTablet: 5 }}
          >
            <Row>
              <Col width={[1, 1, 1, 1 / 2]}>
                <H2>Out in the wild</H2>
              </Col>
              <Col width={[1, 1, 1, 1 / 2]}>
                {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GreyBackground>
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
    travel: file(relativePath: { eq: "case-study/beyond_photography.png" }) {
      publicURL
      childImageSharp {
        fluid {
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
          services {
            title
            id
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

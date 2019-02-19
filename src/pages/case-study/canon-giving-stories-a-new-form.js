import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding, Margin } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import Layout from '../../components/layout'
import GreyBackground, {
  GreyBackgroundOffset
} from '../../components/Common/GreyBackground'
import landscape from '../../images/case-study/at_the_heart_of_a_story.svg'
import Image from '../../components/Common/Image'
import { makeText } from '../../utils/makeText'
import Head from '../../components/Common/Head'

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

  ${breakpoint('tablet')`
    width: 83.3%; // 10/12
    margin: 0 auto;
  `}
`

const FirstParagraphCol = styled(Col)`
  margin-left: auto;
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
      <CenteredCol width={[1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
        <Margin top={3} bottom={{ smallPhone: 3, tablet: 1 }}>
          <SectionTitle reverse>
            Beyond <BrAtTablet /> photography
          </SectionTitle>
        </Margin>
      </CenteredCol>
    </Row>
    <Row>
      <CenteredCol width={[1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
        <Margin bottom={{ smallPhone: 1, tablet: 60 }}>
          {makeText(text).map((p, i) => (
            <BodyPrimary muted reverse key={i}>
              {p}
            </BodyPrimary>
          ))}
        </Margin>
      </CenteredCol>
    </Row>
    <Row>
      <CenteredCol width={[1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
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
  data: { contentfulNonTemplatedCaseStudy: caseStudy, travel },
  location
}) => {
  return (
    <Layout location={location}>
      <Head page={caseStudy} />
      <Grid>
        <CaseStudyHero caseStudy={caseStudy} />
        <Padding top={{ smallPhone: 3.5, tablet: 5 }} />
        <Row>
          <FirstParagraphCol width={[1, 1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
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
                <SectionTitle>At the heart of a photo is a story</SectionTitle>
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
                    <BodyPrimary key={i}>{p}</BodyPrimary>
                  ))}
                </Margin>
              </RightAlignedCol>
            </Row>
          </Grid>
        </Padding>

        <NoMobile tablet as={Grid}>
          <GradientBackground>
            <GradientContent
              text={caseStudy.genericText3.genericText3}
              image={travel.childImageSharp}
            />
          </GradientBackground>
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
        <Padding
          top={{ smallPhone: 3.5, tablet: 5 }}
          bottom={{ smallPhone: 3, smallTablet: 3.5, tablet: 4 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <SectionTitle>Exploring the story</SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                <BodyPrimary key={i}>{p}</BodyPrimary>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>

      <MobileOnly>
        <Video />
      </MobileOnly>

      <GreyBackgroundOffset topMargin topOffset={-150}>
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
                <SectionTitle>Out in the wild</SectionTitle>
              </Col>
              <Col width={[1, 1, 1, 1 / 2]}>
                {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
                  <BodyPrimary key={i}>{p}</BodyPrimary>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GreyBackgroundOffset>
      {caseStudy.relatedCaseStudy ? (
        <Grid>
          <Padding top={4} bottom={5}>
            <CaseStudyPreview caseStudy={caseStudy.relatedCaseStudy} />
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
    contentfulNonTemplatedCaseStudy(
      slug: { eq: "canon-giving-stories-a-new-form" }
    ) {
      relatedCaseStudy {
        title
        slug
        introSentence
        posterImage {
          fluid(maxWidth: 550) {
            ...GatsbyContentfulFluid_withWebp
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
          ...GatsbyContentfulFluid_withWebp
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
      specialities {
        title
        id
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
`

export default IndexPage

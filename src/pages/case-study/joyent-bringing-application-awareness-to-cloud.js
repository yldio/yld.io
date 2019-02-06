import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import Layout from '../../components/layout'
import GreyBackground from '../../components/GreyBG'
import Image from '../../components/Common/Image'
import { makeText } from '../../utils/makeText'
import Head from '../../components/Common/Head'

const ColWithoutExtraPadding = styled(Col)`
  margin-left: auto;
  ${breakpoint('smallTablet')`
    padding-left: 0;
  `}
`

const SpreadUntilDesktop = styled(Col)`
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  ${breakpoint('smallTablet')`
    flex: 0 0 50%;
  `}

  ${breakpoint('desktop')`
    flex: none;
    &:last-child {
      padding-left: 0;
    }
  `}
`

const FlexDirectionColumn = styled(Col)`
  flex: none;
  flex-direction: column;

  ${breakpoint('smallTablet')`
    flex-direction: row;
  `}

  ${breakpoint('desktop')`
    flex-direction: column;
  `}
`

const MetricsCol = styled(Col)`
  display: grid;
  grid-template-columns: 208px;
  justify-content: center;
  grid-gap: ${remcalc(32)};

  ${breakpoint('smallTablet')`
      grid-template-columns: repeat(4, 1fr);
      max-width: 80%;
      margin: auto;
  `}
`

const Divider = styled.div`
  height: 1px;
  width: 100vw;
  background-color: #e6e6e6;
`

const IndexPage = ({
  data: {
    contentfulNonTemplatedCaseStudy: caseStudy,
    deployment,
    picture,
    form,
    metric1,
    metric2,
    metric3,
    metric4,
    navigation,
    signOn,
    topology
  }
}) => {
  return (
    <Layout>
      <Head page={caseStudy} />
      <Grid>
        <CaseStudyHero caseStudy={caseStudy} />
        <Padding top={{ smallPhone: 3.5, tablet: 5 }} />
        <Row>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <SectionTitle>The challenge</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
            {makeText(caseStudy.genericText2.genericText2).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </Row>
        <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
      </Grid>
      <GreyBackground>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 0, tablet: 5 }}
        >
          <Grid>
            <Row>
              <FlexDirectionColumn
                width={[1, 1, 1, 1, 1, 1, 5 / 12]}
                block={false}
              >
                <SpreadUntilDesktop>
                  <SectionTitle>Single sign-on</SectionTitle>
                </SpreadUntilDesktop>
                <SpreadUntilDesktop>
                  {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                    <BodyPrimary key={i}>{p}</BodyPrimary>
                  ))}
                </SpreadUntilDesktop>
              </FlexDirectionColumn>
            </Row>
            <Row>
              <Col width={[1]}>
                <Padding top={{ smallPhone: 3, tablet: 4 }}>
                  <Image text="Single Sign on" image={signOn.childImageSharp} />
                </Padding>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GreyBackground>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <SectionTitle>Navigation</SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                <BodyPrimary key={i}>{p}</BodyPrimary>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3, tablet: 4 }}>
                <Image
                  text="Joyent Navigation"
                  image={navigation.childImageSharp}
                />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <Padding bottom={{ smallPhone: 3.5, smallTablet: 5 }}>
        <Grid>
          <Row>
            <FlexDirectionColumn width={[1, 1, 1, 1, 1, 1, 0.5]} block={false}>
              <SpreadUntilDesktop>
                <SectionTitle>App deployment</SectionTitle>
              </SpreadUntilDesktop>
              <SpreadUntilDesktop>
                {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
                  <BodyPrimary key={i}>{p}</BodyPrimary>
                ))}
              </SpreadUntilDesktop>
            </FlexDirectionColumn>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3, tablet: 4 }}>
                <Image
                  text="Single Sign on"
                  image={deployment.childImageSharp}
                />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <GreyBackground>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 5 / 12]}>
                <SectionTitle>Topology</SectionTitle>
                {makeText(caseStudy.genericText6.genericText6).map((p, i) => (
                  <BodyPrimary key={i}>{p}</BodyPrimary>
                ))}
              </Col>
              <Col width={[1, 1, 1, 1, 7 / 12]}>
                <Padding top={{ smallPhone: 3, tablet: 0 }}>
                  <Image
                    text="Topology View"
                    image={topology.childImageSharp}
                  />
                </Padding>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GreyBackground>
      <Padding vertical={{ smallPhone: 3, tablet: 4 }}>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <SectionTitle>The big picture</SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText7.genericText7).map((p, i) => (
                <BodyPrimary key={i}>{p}</BodyPrimary>
              ))}
            </Col>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3.5, tablet: 4 }}>
                <Image text="Dashboard" image={picture.childImageSharp} />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <GreyBackground>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <SectionTitle>Metrics visualisation</SectionTitle>
              </Col>
              <ColWithoutExtraPadding width={[1, 1, 1, 1, 1 / 2]}>
                {makeText(caseStudy.genericText8.genericText8).map((p, i) => (
                  <BodyPrimary key={i}>{p}</BodyPrimary>
                ))}
              </ColWithoutExtraPadding>
            </Row>
            <Padding top={{ smallPhone: 3, tablet: 4 }}>
              <Row>
                <MetricsCol width={[1, 1, 1, 1, 1]}>
                  <Image text="metrics1" image={metric1.childImageSharp} />
                  <Image text="metrics2" image={metric2.childImageSharp} />
                  <Image text="metrics3" image={metric3.childImageSharp} />
                  <Image text="metrics4" image={metric4.childImageSharp} />
                </MetricsCol>
              </Row>
            </Padding>
          </Grid>
        </Padding>
      </GreyBackground>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Grid>
          <Row>
            <FlexDirectionColumn width={[1, 1, 1, 1, 1, 1, 0.5]} block={false}>
              <SpreadUntilDesktop>
                <SectionTitle>Monitoring and alerting</SectionTitle>
              </SpreadUntilDesktop>
              <SpreadUntilDesktop>
                {makeText(caseStudy.genericText9.genericText9).map((p, i) => (
                  <BodyPrimary key={i}>{p}</BodyPrimary>
                ))}
              </SpreadUntilDesktop>
            </FlexDirectionColumn>
          </Row>
          <Row>
            <Col width={[1]}>
              <Padding top={{ smallPhone: 3, tablet: 4 }}>
                <Image
                  text="Monitoring and alerting"
                  image={form.childImageSharp}
                />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
      <Divider />
      {caseStudy.relatedCaseStudy ? (
        <Grid>
          <Padding bottom={5} top={{ smallPhone: 3.5, tablet: 4 }}>
            <CaseStudyPreview caseStudy={caseStudy.relatedCaseStudy} />
          </Padding>
        </Grid>
      ) : null}
    </Layout>
  )
}
export const query = graphql`
  {
    navigation: file(relativePath: { eq: "case-study/joyent/navigation.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    signOn: file(relativePath: { eq: "case-study/joyent/single_sign_on.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    topology: file(relativePath: { eq: "case-study/joyent/topology.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    metric2: file(relativePath: { eq: "case-study/joyent/metric_2.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    metric3: file(relativePath: { eq: "case-study/joyent/metric_3.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    metric4: file(relativePath: { eq: "case-study/joyent/metric_4.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    metric1: file(relativePath: { eq: "case-study/joyent/metric_1.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    deployment: file(
      relativePath: { eq: "case-study/joyent/app_deployment.png" }
    ) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    picture: file(relativePath: { eq: "case-study/joyent/big_picture.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    form: file(
      relativePath: { eq: "case-study/joyent/form_editing_alert.png" }
    ) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    contentfulNonTemplatedCaseStudy(
      slug: { eq: "joyent-bringing-application-awareness-to-cloud" }
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

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
import GreyBackground from '../../components/Common/GreyBackground'
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
    contentfulNonTemplatedCaseStudyV2: caseStudy,
    deployment,
    picture,
    form,
    metric1,
    metric2,
    metric3,
    metric4,
    navigation,
    signOn,
    topology,
  },
}) => {
  return (
    <Layout footerContactUsId={caseStudy.footerContactUs.id}>
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <SectionTitle>The challenge</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            {makeText(
              caseStudy.genericBlock1[0].genericBlockText.genericBlockText,
            ).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
            {makeText(
              caseStudy.genericBlock2[0].genericBlockText.genericBlockText,
            ).map((p, i) => (
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
                  {makeText(
                    caseStudy.genericBlock3[0].genericBlockText
                      .genericBlockText,
                  ).map((p, i) => (
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
              {makeText(
                caseStudy.genericBlock4[0].genericBlockText.genericBlockText,
              ).map((p, i) => (
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
                {makeText(
                  caseStudy.genericBlock5[0].genericBlockText.genericBlockText,
                ).map((p, i) => (
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
                {makeText(
                  caseStudy.genericBlock6[0].genericBlockText.genericBlockText,
                ).map((p, i) => (
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
              {makeText(
                caseStudy.genericBlock7[0].genericBlockText.genericBlockText,
              ).map((p, i) => (
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
                {makeText(
                  caseStudy.genericBlock8[0].genericBlockText.genericBlockText,
                ).map((p, i) => (
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
                {makeText(
                  caseStudy.genericBlock9[0].genericBlockText.genericBlockText,
                ).map((p, i) => (
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
      <CaseStudyPreview
        isTop={false}
        caseStudy={caseStudy.relatedCaseStudies[0]}
      />
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
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "joyent-bringing-application-awareness-to-cloud" }
    ) {
      slug
      title
      seoMetaData {
        ...SEOMetaFields
      }
      posterImage {
        fluid(maxWidth: 550) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
          url
        }
      }
      ...NonTemplatedCaseStudyV2Related
      genericBlock1 {
        ...GenericFragment
      }
      genericBlock2 {
        ...GenericFragment
      }
      genericBlock3 {
        ...GenericFragment
      }
      genericBlock4 {
        ...GenericFragment
      }
      genericBlock5 {
        ...GenericFragment
      }
      genericBlock6 {
        ...GenericFragment
      }
      genericBlock7 {
        ...GenericFragment
      }
      genericBlock8 {
        ...GenericFragment
      }
      genericBlock9 {
        ...GenericFragment
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
      footerContactUs {
        id
      }
    }
  }
`

export default IndexPage

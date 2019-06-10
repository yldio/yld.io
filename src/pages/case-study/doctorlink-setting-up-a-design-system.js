import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import Layout from '../../components/layout'
import { makeText } from '../../utils/makeText'
import Head from '../../components/Common/Head'
import VideoSection from '../../components/Common/VideoSection'
import BlueBackground from '../../components/Common/BlueBackground'
import SubtitleWithBody from '../../components/Common/SubtitleWithBody'

const FirstParagraphCol = styled(Col)`
  margin-left: auto;
`

// will come from Contentful
const futureContentfulDoctorLinkData = {
  node: {
    introSentence: {
      introSentence: 'Lorem ipsum dolor sit amet'
    },
    posterImage: {
      title: 'Canon case study featured image ',
      file: {
        url:
          'https://www.yld.io/static/logo_animated-832020608244057f6a9d73e80994ac4a.gif'
      },
      fluid: {}
    },
    seoMetaDescription: 'Lorem ipsum dolor sit amet',
    seoTitle: 'DoctorLink: setting up a design system',
    services: [{ title: 'Design' }, { title: 'Engineering' }],
    slug: 'doctorlink-setting-up-a-design-system',
    title: 'DoctorLink: setting up a design system',
    genericText1: {
      genericText1:
        'DoctorLink is a healthcare technology company with a mission to simplify the route to health and wellbeing for patients globally.'
    },
    genericText2: {
      genericText2:
        'DoctorLink partnered with YLD to help redesign the user interface and improve upon the UX framework of their cross-platform product. This eventually evolved into the creation of a Design System and the introduction of DesignOps resulting in a cultural shift in their entire organisation.'
    },
    genericText3: {
      genericText3: `We initially conducted a series of interviews with different stakeholders, aiming to capture a wide spectrum of beliefs, motives, intentions and expectations regarding both the company and the product.

      We assessed the overall state of the product and how it responded to users’ needs and expectations as well as business goals. This work relied on analysing user feedback from usability testing as well as survey data from existing customers.
      
      By identifying common themes and collaboratively consolidating discrepancies, we were able to formulate a set of principles. These principles encapsulated shared criterias for value, quality and success that were suitable not only for the design or engineering teams, but rather the whole of the company.`
    },
    genericText4: {
      genericText4: `These broad principles ensured that the product was seamless, empowering and universal to all users

      We were able to benchmark all subsequent design decisions against these principles.`
    },
    genericText5: {
      genericText5: `The most immediate task was assessing the existing UI components and patterns from a usability and aesthetic perspective, in order to improve upon them.

      Armed with our recently defined principles and user feedback, we redesigned the UI and visuals from the ground up with the aim to create a recognizable visual language that mirrored the new principles.
      
      This assessment gave us a perception of the visual discrepancies between the design files and the final code, which helped us bridging the gap between engineering and design.`
    },
    genericText6: {
      genericText6: `The original Albert Sans typeface was replaced with the open-source Noto Sans - a highly supported typeface characterised by a sound balance between form and function, which offered the global versatility of including over 800 languages.`
    },
    genericText7: {
      genericText7: `We also took this blank slate as an opportunity to reinvigorate DoctorLink’s colour palette, while being carefully faithful to the legacy of the original brand colour - which had emphasised the product’s ties to the UK’s NHS. The new ‘DoctorLink Blue’ offered a stronger, modern and confident identity to the visuals and also helped the product gain the highest degree of visual accessibility.`
    },
    genericText8: {
      genericText8: `In order to further lift the brands humility and character, YLD set about enriching the product with an array of custom illustrations, offering visual delight and  conveying abstract concepts succinctly.`
    },
    genericText9: {
      genericText9: `As we started to create some of the initial UI components, we simultaneously conducted user interviews and testing.

      We quickly identified components and patterns that worked, and ones that did not. Those that did were consolidated into the burgeoning Design System.
      
      It was a granular approach that allowed us to amass a collection of effective layouts and composites, confident of their performance. We continued this practice as the product grew, constantly adapting to test larger considerations, such as user flows and journeys.`
    }
  }
}

const IndexPage = ({
  caseStudy = futureContentfulDoctorLinkData.node,
  location
}) => (
  <Layout location={location}>
    {/* Case study image */}
    <Head
      page={{
        ...caseStudy,
        socialLogo:
          'https://www.yld.io/static/logo_animated-832020608244057f6a9d73e80994ac4a.gif'
      }}
    />
    {/* Case study services */}
    <CaseStudyHero caseStudy={caseStudy} />
    {/* DoctorLink is a healthcare technology company ... */}
    <Grid>
      <Row>
        <FirstParagraphCol width={[1]}>
          {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
            <BodyPrimary key={i}>{p}</BodyPrimary>
          ))}
        </FirstParagraphCol>
      </Row>
      <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
    </Grid>
    {/* The prologue / new component to make */}
    <Grid>{caseStudy.genericText2.genericText2}</Grid>
    <br />
    <br />
    {/* Video section. PS: link is hard-coded in Canon case study. Should come from Contentful */}
    <Grid>
      <VideoSection src="https://www.youtube.com/embed/MPPk-BkImsc" />
    </Grid>
    {/* Finding common ground */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SectionTitle>Finding common ground</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </Row>
      </Padding>
    </Grid>
    {/* Seamless. Empowering. Universal. */}
    <BlueBackground>
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 1 }}
          bottom={{ smallPhone: 3, smallTablet: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <SectionTitle style={{ color: 'white' }}>
                Seamless. Empowering. Universal.
              </SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                <BodyPrimary key={i} style={{ color: 'white' }}>
                  {p}
                </BodyPrimary>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>
    </BlueBackground>
    {/* A new visual language */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SectionTitle>A new visual language</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </Row>
      </Padding>
    </Grid>

    {/* new images section */}
    <img
      alt=""
      src="https://images.ctfassets.net/22g1lenhck4z/4M3h74EWpWw8AosOCIemoc/e13a13eefedf4ecd5edf26b596d2b3e0/thomas_cook_export.svg"
    />

    {/* Hi, I am Noto Sans. */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SectionTitle>Hi, I am Noto Sans.</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText6.genericText6).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </Row>
      </Padding>
    </Grid>

    {/* Colour text section */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SubtitleWithBody
              subtitle={'Colour'}
              body={caseStudy.genericText7.genericText7}
            />
          </Col>
        </Row>
      </Padding>
    </Grid>

    {/* new Color images section */}
    <img
      alt=""
      src="https://images.ctfassets.net/22g1lenhck4z/27ChKj8ZNCeQYc2QSUoiiO/f7c9f93f62a8cd07b0972788c5059619/joyent_export.svg"
    />

    {/* illustrations section */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[0, 0, 0, 1 / 2]} />
          <Col width={[1, 1, 1, 1 / 2]}>
            <SubtitleWithBody
              subtitle={'Illustrations'}
              body={caseStudy.genericText8.genericText8}
            />
          </Col>
        </Row>
      </Padding>
    </Grid>

    {/* Yellow / green / red / blue grid */}
    <img
      alt=""
      src="https://images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png"
    />
    {/* Protoyping and 
fast iteration */}
    <Grid>
      <Padding
        top={{ smallPhone: 4, smallTablet: 1 }}
        bottom={{ smallPhone: 3, smallTablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SectionTitle>Protoyping and fast iteration</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText9.genericText9).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </Row>
      </Padding>
    </Grid>
  </Layout>
)

export const query = futureContentfulDoctorLinkData

export { futureContentfulDoctorLinkData }
export default IndexPage

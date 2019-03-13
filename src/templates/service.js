import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { SectionTitle, Subtitle } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import SeoLinks from '../components/Common/seoLinks'
import WorkStages from '../components/Service/WorkStages'
import GreyBackground from '../components/Common/GreyBackground'
import BlueBackground from '../components/Common/BlueBackground'
import Head from '../components/Common/Head'
import Statement from '../components/Common/Statement'

const WeWorkWithPadding = styled.div`
  padding-top: ${props => (props.index === 1 ? remcalc(36) : remcalc(24))};
  ${breakpoint('tablet')`
    padding-top: ${props => remcalc(props.index * 72)};
  `}
`

const Service = ({ data: { contentfulService: service }, location }) => {
  const {
    specialityAreaTitle1,
    specialityAreaItems1,
    specialityAreaTitle2,
    specialityAreaItems2,
    specialityAreaTitle3,
    specialityAreaItems3,
    specialityAreaTitle4,
    specialityAreaItems4
  } = service

  return (
    <Layout location={location}>
      <Head page={service} />
      <CaseStudyPreview caseStudy={service.caseStudies[0]} />

      <GreyBackground>
        <Grid>
          <Statement>
            {service.mainPageIntroSentence.mainPageIntroSentence}
          </Statement>
        </Grid>
      </GreyBackground>

      <BlueBackground>
        <WorkStages
          title={service.workStagesTitle}
          workStages={service.workStages}
        />
      </BlueBackground>
      <GreyBackground>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallTablet: 3.5, tablet: 5 }}
        >
          <Grid>
            <Row>
              <Col width={[1]}>
                <SectionTitle>We work with</SectionTitle>
              </Col>
            </Row>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                <WeWorkWithPadding index={1}>
                  {specialityAreaTitle1 ? (
                    <Subtitle>{specialityAreaTitle1}</Subtitle>
                  ) : null}
                  <SeoLinks items={specialityAreaItems1} />
                </WeWorkWithPadding>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {specialityAreaItems2 && (
                  <WeWorkWithPadding index={2}>
                    <Subtitle>{specialityAreaTitle2}</Subtitle>
                    <SeoLinks items={specialityAreaItems2} />
                  </WeWorkWithPadding>
                )}
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {specialityAreaItems3 && (
                  <WeWorkWithPadding index={3}>
                    <Subtitle>{specialityAreaTitle3}</Subtitle>
                    <SeoLinks items={specialityAreaItems3} />
                  </WeWorkWithPadding>
                )}
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {specialityAreaItems4 && (
                  <WeWorkWithPadding index={4}>
                    <Subtitle>{specialityAreaTitle4}</Subtitle>
                    <SeoLinks items={specialityAreaItems4} />
                  </WeWorkWithPadding>
                )}
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GreyBackground>
      <CaseStudyPreview isTop={false} caseStudy={service.bottomCaseStudy} />
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`
  query($id: String) {
    contentfulService(id: { eq: $id }) {
      slug
      title
      seoTitle
      seoMetaDescription
      mainPageIntroSentence {
        mainPageIntroSentence
      }
      bottomCaseStudy {
        title
        slug
        introSentence
        posterImage {
          title
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
          file {
            url
          }
        }
        posterColor
      }
      caseStudies {
        ... on ContentfulTemplatedCaseStudy {
          title
          slug
          introSentence
          posterColor
          posterImage {
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
            title
            file {
              url
            }
          }
        }
        ... on ContentfulNonTemplatedCaseStudy {
          title
          slug
          intro: introSentence {
            introSentence
          }
          posterColor
          posterImage {
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
            title
            file {
              url
            }
          }
        }
      }
      workStagesTitle
      workStages {
        id
        title
        displayType
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
      }
      specialityAreaTitle2
      specialityAreaItems2 {
        id
        slug
        title
      }
      specialityAreaTitle3
      specialityAreaItems3 {
        id
        slug
        title
      }
      specialityAreaTitle4
      specialityAreaItems4 {
        id
        slug
        title
      }
    }
  }
`

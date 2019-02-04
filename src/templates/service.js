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
import WorkStages from '../components/Service/work-stage/index'
import GreyBackground from '../components/GreyBG'
import BlueBackground from '../components/BlueBG'
import Head from '../components/Common/Head'
import StatementComponent from '../components/Common/StatementComponent'

const WeWorkWithPadding = styled.div`
  padding-top: ${props => (props.index === 1 ? remcalc(36) : remcalc(24))};
  ${breakpoint('tablet')`
    padding-top: ${props => remcalc(props.index * 72)};
  `}
`

const Service = ({ data: { contentfulService: service }, location }) => {
  return (
    <Layout location={location}>
      <Head page={service} />
      <Grid>
        <Row>
          <Col width={[1]}>
            <Padding vertical={3.5}>
              <CaseStudyPreview caseStudy={service.caseStudies[0]} />
            </Padding>
          </Col>
        </Row>
      </Grid>

      <StatementComponent
        text={service.mainPageIntroSentence.mainPageIntroSentence}
      />
      <BlueBackground>
        <WorkStages
          title={service.workStagesTitle}
          workStages={service.workStages}
          image={service.graphic}
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
                  <Subtitle>{service.specialityAreaTitle1}</Subtitle>
                  <SeoLinks items={service.specialityAreaItems1} />
                </WeWorkWithPadding>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                <WeWorkWithPadding index={2}>
                  <Subtitle>{service.specialityAreaTitle2}</Subtitle>
                  <SeoLinks items={service.specialityAreaItems2} />
                </WeWorkWithPadding>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {service.specialityAreaTitle3 && (
                  <WeWorkWithPadding index={3}>
                    <Subtitle>{service.specialityAreaTitle3}</Subtitle>
                    <SeoLinks items={service.specialityAreaItems3} />
                  </WeWorkWithPadding>
                )}
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
                {service.specialityAreaTitle4 && (
                  <WeWorkWithPadding index={4}>
                    <Subtitle>{service.specialityAreaTitle4}</Subtitle>
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
            <CaseStudyPreview caseStudy={service.bottomCaseStudy} />
          </Padding>
        ) : null}
      </Grid>
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
      graphic {
        fluid(maxWidth: 680) {
          ...GatsbyContentfulFluid_withWebp
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
      workStagesImage {
        title
        fluid(maxWidth: 680) {
          ...GatsbyContentfulFluid_withWebp
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

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'

import { Grid } from '../components/grid'
import Layout from '../components/layout'
import SEOText from '../components/Homepage/seoText'
import Approach from '../components/Training/Approach'
import Courses from '../components/Training/Courses'
import Modal from '../components/Training/Modal'
import CaseStudy from '../components/Homepage/caseStudy'
import GrayBackground from '../components/GreyBG'
import TalkToUsSection from '../components/Speciality/talkToUs'

class TrainingPage extends Component {
  state = {
    modalContent: null
  }

  toggleModal = modalContent => {
    if (modalContent) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'absolute'

      return this.setState({
        modalContent
      })
    }
    document.body.style.overflow = 'auto'
    document.body.style.position = 'inherit'

    return this.setState({
      modalContent
    })
  }

  render() {
    const {
      data: { contentfulTrainingPage: content, site }
    } = this.props
    const { modalContent } = this.state

    const trainingApproachesContent = [
      content.trainingApproachContent1.trainingApproachContent1,
      content.trainingApproachContent2.trainingApproachContent2,
      content.trainingApproachContent3.trainingApproachContent3
    ]
    const courseCategories = Array.from(
      new Set(content.courses.map(c => c.category))
    )

    return (
      <Layout>
        <Helmet
          title={`${site.siteMetadata.title} ${
            content.seoTitle ? '- ' + content.seoTitle : ''
          } `}
          meta={[{ name: 'description', content: content.seoMetaDescription }]}
        >
          <html lang="en" />
        </Helmet>
        <Modal content={modalContent} toggleModal={this.toggleModal} />
        <Grid>
          <Padding bottom={{ smallPhone: 0, smallTablet: 2, desktop: 2 }}>
            <CaseStudy
              caseStudy={content.featuredCaseStudy}
              subHeading="Featured work"
            />
          </Padding>
          <Padding bottom={{ smallPhone: 0, desktop: 2 }} />
        </Grid>
        <GrayBackground noTop>
          <Grid>
            <Padding
              top={{ smallPhone: 4, smallTablet: 4, desktop: 4 }}
              bottom={{ smallPhone: 2, smallTablet: 2, desktop: 2 }}
            >
              <SEOText text={content.seoText.content[0].content} />
            </Padding>
          </Grid>
        </GrayBackground>
        <Approach
          title={content.trainingApproachTitle}
          content={trainingApproachesContent}
          formats={content.trainingFormats}
        />
        <Courses
          categories={courseCategories}
          toggleModal={this.toggleModal}
          courses={content.courses}
        />
        <TalkToUsSection
          contactTitle={content.contactUsTitle}
          contactText={content.contactUsText.contactUsText}
        />
        <Grid>
          {content.relatedCaseStudy ? (
            <Padding
              top={{ smallPhone: 3, tablet: 5 }}
              bottom={{ smallPhone: 3.5, tablet: 5 }}
            >
              <CaseStudy
                subHeading="Featured work"
                caseStudy={content.relatedCaseStudy}
              />
            </Padding>
          ) : null}
        </Grid>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    contentfulTrainingPage {
      title
      seoTitle
      seoMetaDescription
      contactUsText {
        contactUsText
      }
      contactUsTitle
      trainingApproachTitle
      trainingApproachContent1 {
        trainingApproachContent1
      }
      trainingApproachContent2 {
        trainingApproachContent2
      }
      trainingApproachContent3 {
        trainingApproachContent3
      }
      featuredCaseStudy {
        id
        title
        slug
        posterImage {
          title
          file {
            url
          }
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
        posterColor
        introSentence
      }
      seoText {
        content {
          content {
            value
            nodeType
          }
        }
      }
      trainingFormats {
        id
        title
        description
        bulletPoints
        icon {
          title
          file {
            url
          }
        }
      }
      courses {
        name
        technology
        level
        category
        preRequisites
        preRequisitesCourses
        logo {
          fluid(maxWidth: 680) {
            ...GatsbyContentfulFluid_tracedSVG
          }
          title
          file {
            url
          }
        }
        description {
          description
        }
      }
      relatedCaseStudy {
        title
        slug
        posterImage {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_tracedSVG
          }
          title
          file {
            url
          }
        }
        posterColor
        introSentence
      }
    }
  }
`

export default TrainingPage

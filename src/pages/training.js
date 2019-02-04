import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'

import { Grid } from '../components/grid'
import Layout from '../components/layout'
import StatementComponent from '../components/Common/StatementComponent'
import Approach from '../components/Training/Approach'
import Courses from '../components/Training/Courses'
import Modal from '../components/Training/Modal'
import CaseStudy from '../components/Common/CaseStudyCards/CaseStudyPreview'
import GetInTouch from '../components/Common/GetInTouch'
import Head from '../components/Common/Head'

class TrainingPage extends Component {
  state = {
    modalContent: null
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress, false)
  }

  handleKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.setState({
        modalContent: null
      })
    }
  }

  toggleModal = modalContent => {
    if (modalContent) {
      return this.setState({
        modalContent
      })
    }

    return this.setState({
      modalContent
    })
  }

  render() {
    const {
      data: { contentfulTrainingPage: content }
    } = this.props
    const { modalContent } = this.state

    const trainingApproachesContent = [
      content.trainingApproachContent1.trainingApproachContent1,
      content.trainingApproachContent2.trainingApproachContent2,
      content.trainingApproachContent3.trainingApproachContent3
    ]

    return (
      <Layout>
        <Head page={content} />
        <Modal content={modalContent} toggleModal={this.toggleModal} />
        <Grid>
          <Padding
            bottom={{ smallPhone: 0, smallTablet: 2, desktop: 2 }}
            top={3.5}
          >
            <CaseStudy caseStudy={content.featuredCaseStudy} />
          </Padding>
          <Padding bottom={{ smallPhone: 2, desktop: 4 }} />
        </Grid>

        <StatementComponent text={content.seoText.content[0].content} />

        <Approach
          title={content.trainingApproachTitle}
          content={trainingApproachesContent}
          formats={content.trainingFormats}
        />
        <Courses
          categories={content.courseCategories}
          toggleModal={this.toggleModal}
        />
        <GetInTouch
          title={`${content.contactUsTitle}`}
          contactText={content.contactUsText.contactUsText}
        />
        <Grid>
          {content.relatedCaseStudy ? (
            <Padding
              top={{ smallPhone: 3, smallTablet: 5 }}
              bottom={{ smallPhone: 3.5, smallTablet: 5 }}
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
      courseCategories {
        id
        name
        logo {
          fluid(maxWidth: 680) {
            ...GatsbyContentfulFluid_withWebp
          }
          title
          file {
            url
          }
        }
        courses {
          id
          name
          technology
          level
          preRequisites
          preRequisitesCourses
          description {
            description
          }
          content {
            content
          }
        }
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
            ...GatsbyContentfulFluid_withWebp
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
      relatedCaseStudy {
        title
        slug
        posterImage {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
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

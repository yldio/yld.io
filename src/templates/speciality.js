import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import IntroSection from '../components/Speciality/intro'
import ProjectsSection from '../components/Speciality/projects'
import TrainingSection from '../components/Speciality/training'
import CommunitySection from '../components/Speciality/community'
import EventSection from '../components/Speciality/events'
import TalksSection from '../components/Speciality/talks'
import TalkToUsSection from '../components/Speciality/talkToUs'
import TutorialsSection from '../components/Speciality/tutorials'
import BooksSection from '../components/Speciality/books'
import BlogPostsSection from '../components/Speciality/blog'

const Speciality = ({ data, location }) => {
  const speciality = data.allContentfulSpeciality.edges[0].node
  const site = data.site
  return (
    <Layout blue logoColour={speciality.logoColour} location={location}>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          speciality.title ? '- ' + speciality.title : ''
        } ${speciality.seoTitle ? '- ' + speciality.seoTitle : ''} `}
        meta={[
          {
            name: 'description',
            content: speciality.seoMetaDescription
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
      <IntroSection speciality={speciality} />
      <ProjectsSection speciality={speciality} />
      <TrainingSection speciality={speciality} />
      {speciality.communityText ? (
        <CommunitySection speciality={speciality} />
      ) : null}
      <EventSection speciality={speciality} />
      <TalksSection speciality={speciality} />
      <BlogPostsSection speciality={speciality} />
      <TutorialsSection speciality={speciality} />
      <BooksSection speciality={speciality} />
      <TalkToUsSection
        title={speciality.title}
        contactText={speciality.contactText}
      />
    </Layout>
  )
}

export default Speciality

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulSpeciality(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          seoTitle
          seoMetaDescription
          seoText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introGraphic {
            id
            title
            file {
              fileName
              url
            }
          }
          introTitle
          introTextTitle1
          introTextBody1 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introTextTitle2
          introTextBody2 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introTextTitle3
          introTextBody3 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          relatedProjects {
            ... on ContentfulCaseStudy {
              title
              slug
              introSentence
              posterColor
              posterImage {
                title
                file {
                  url
                }
              }
            }
          }
          clients {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingIntroText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon1 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle1
          trainingTextBody1 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon2 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle2
          trainingTextBody2 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon3 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle3
          trainingTextBody3 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          externalResources {
            type
            title
            link
            additionalInfo
            id
            colorCode
          }
          communityText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          communityLogo {
            id
            title
            file {
              fileName
              url
            }
          }
          communityBackground {
            id
            title
            file {
              fileName
              url
            }
          }
          eventIcon {
            id
            title
            file {
              fileName
              url
            }
          }
          events {
            id
            eventTitle
            date
            startTime
            linkToEvent
            blurb {
              blurb
            }
          }
          contactText
          featuredTalkIcon {
            id
            title
            file {
              fileName
              url
            }
          }
          videoIcon {
            id
            title
            file {
              fileName
              url
            }
          }
          logoColour
        }
      }
    }
  }
`

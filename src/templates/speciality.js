import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import IntroSection from '../components/Speciality/intro'
import ProjectsSection from '../components/Speciality/projects'
import TrainingSection from '../components/Speciality/training'
import CommunitySection from '../components/Speciality/community'
import EventSection from '../components/Speciality/events'
import TalksSection from '../components/Speciality/talks'
import GetInTouch from '../components/Common/GetInTouch'
import TutorialsSection from '../components/Speciality/tutorials'
import BooksSection from '../components/Speciality/books'
import BlogPostsSection from '../components/Speciality/blog'
import Head from '../components/Common/Head'

const Speciality = ({
  data: { contentfulSpeciality: speciality, videoIcon },
  location
}) => {
  const getExternalType = type =>
    speciality.externalResources.filter(
      additionalInfo => additionalInfo.type === type
    ) || []

  return (
    <Layout
      backgroundColor="blue"
      logoColour={speciality.logoColour}
      location={location}
    >
      <Head page={speciality} />
      <IntroSection speciality={speciality} />
      <ProjectsSection
        related={speciality.relatedProjects}
        title={speciality.title}
        clients={speciality.clients}
      />
      <TrainingSection speciality={speciality} />
      <CommunitySection
        background={speciality.communityBackground}
        logo={speciality.communityLogo}
        text={speciality.communityText}
        title={speciality.title}
      />
      <EventSection
        events={speciality.events}
        title={speciality.title}
        eventIcon={speciality.eventIcon}
      />
      <TalksSection talks={getExternalType(`Talk`)} videoIcon={videoIcon} />
      <BlogPostsSection title={speciality.title} />
      <TutorialsSection
        externalResources={speciality.externalResources}
        tutorials={getExternalType(`Tutorial`)}
      />
      <BooksSection title={speciality.title} books={getExternalType(`Book`)} />
      <GetInTouch
        title={`Talk to us about ${speciality.title}`}
        contactText={speciality.contactText}
      />
    </Layout>
  )
}

export default Speciality

export const pageQuery = graphql`
  query($id: String) {
    contentfulSpeciality(id: { eq: $id }) {
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
        ... on ContentfulTemplatedCaseStudy {
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
        ... on ContentfulNonTemplatedCaseStudy {
          title
          slug
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
        cta
        featured
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
      logoColour
    }

    videoIcon: contentfulAsset(
      id: { eq: "395d5bbc-442f-57c2-81d8-90c04fe428e6" }
    ) {
      id
      title
      file {
        fileName
        url
      }
    }
  }
`

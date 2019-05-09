import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import IntroSection from '../components/Speciality/Intro'
import ProjectsSection from '../components/Speciality/Projects'
import TrainingSection from '../components/Speciality/Training'
import CommunitySection from '../components/Speciality/Community'
import EventSection from '../components/Speciality/Events'
import TalksSection from '../components/Speciality/Talks'
import GetInTouch from '../components/Common/GetInTouch'
import TutorialsSection from '../components/Speciality/Tutorials'
import BooksSection from '../components/Speciality/Books'
import BlogListing from '../components/Common/BlogListing'
import Head from '../components/Common/Head'

const getExternalType = (speciality, type) =>
  speciality.externalResources.filter(
    additionalInfo => additionalInfo.type === type
  ) || []

const Speciality = ({
  data: {
    contentfulSpeciality: speciality,
    videoIcon,
    filteredPosts: { edges: filteredPosts }
  },
  location
}) => {
  console.log('speciality', speciality)
  const {
    relatedProjects,
    title,
    clients,
    communityBackground,
    communityLogo,
    communityText,
    events,
    eventIcon,
    contactText
  } = speciality

  const posts = filteredPosts.map(({ node }) => node)
  const talks = getExternalType(speciality, `Talk`)
  const tutorials = getExternalType(speciality, `Tutorial`)
  const books = getExternalType(speciality, `Book`)

  return (
    <Layout backgroundColor="blue" location={location}>
      <Head page={speciality} />
      <IntroSection speciality={speciality} />
      <ProjectsSection
        related={relatedProjects}
        title={title}
        clients={clients}
      />
      <TrainingSection speciality={speciality} />
      <CommunitySection
        background={communityBackground}
        logo={communityLogo}
        text={communityText}
        title={title}
      />
      <EventSection events={events} title={title} eventIcon={eventIcon} />
      <TalksSection talks={talks} videoIcon={videoIcon} />
      <BlogListing
        title="Blog posts"
        description={`${title} articles created by members of YLD for the community.`}
        posts={posts}
      />
      {tutorials.length > 0 ? (
        <TutorialsSection speciality={title} tutorials={tutorials} />
      ) : null}
      <BooksSection title={title} books={books} />
      <GetInTouch
        title={`Talk to us about ${title}`}
        contactText={contactText}
      />
    </Layout>
  )
}

export default Speciality

export const pageQuery = graphql`
  query($id: String, $postsTags: [String], $postsLimit: Int) {
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

    filteredPosts: allMediumPost(
      limit: $postsLimit
      sort: { fields: [firstPublishedAt], order: DESC }
      filter: {
        virtuals: { tags: { elemMatch: { slug: { in: $postsTags } } } }
      }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          virtuals {
            tags {
              slug
            }
          }
          uniqueSlug
        }
      }
    }
  }
`

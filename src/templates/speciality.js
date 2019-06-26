import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { isAfter, endOfYesterday } from 'date-fns'

import IntroSection from '../components/Speciality/Intro'
import ProjectsSection from '../components/Speciality/Projects'
import TrainingSection from '../components/Speciality/Training'
import CommunitySection from '../components/Speciality/Community'
import EventSection from '../components/Common/Events'
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

const isSpecialityEvent = (eventTitle, title) => {
  const formattedTitle = title
    .toLowerCase()
    .replace(/(\.|js)/gi, '')
    .trim()

  return eventTitle.toLowerCase().includes(formattedTitle)
}

const getSpecialityEvents = (title, events) =>
  events
    .filter(
      ({ node: { eventTitle, date } }) =>
        isSpecialityEvent(eventTitle, title) && isAfter(date, endOfYesterday())
    )
    .sort((a, b) => (a.date <= b.date ? -1 : 1))
    .slice(0, 5)

const flattenSpeciality = speciality => {
  return {
    slug: speciality.slug,
    title: speciality.title,
    seoTitle: speciality.seoTitle,
    seoMetaDescription: speciality.seoMetaDescription,
    seoText: speciality.seoText.content[0].content[0].value,
    introGraphicTitle: speciality.introGraphic.title,
    introGraphicFileUrl: speciality.introGraphic.file.url,
    introTitle: speciality.introTitle,
    introTextTitle1: speciality.introTextTitle1,
    introTextBody1: speciality.introTextBody1.content[0].content[0].value,
    introTextTitle2: speciality.introTextTitle2,
    introTextBody2: speciality.introTextBody2.content[0].content[0].value,
    introTextTitle3: speciality.introTextTitle3,
    introTextBody3: speciality.introTextBody3.content[0].content[0].value,
    trainingIntroText: speciality.trainingIntroText.content[0].content[0].value,
    trainingTextIcon1Title: speciality.trainingTextIcon1.title,
    trainingTextIcon1Url: speciality.trainingTextIcon1.file.url,
    trainingTextTitle1: speciality.trainingTextTitle1,
    trainingTextBody1: speciality.trainingTextBody1.content[0].content[0].value,
    trainingTextIcon2Title: speciality.trainingTextIcon2.title,
    trainingTextIcon2Url: speciality.trainingTextIcon2.file.url,
    trainingTextTitle2: speciality.trainingTextTitle2,
    trainingTextBody2: speciality.trainingTextBody2.content[0].content[0].value,
    trainingTextIcon3Title: speciality.trainingTextIcon3.title,
    trainingTextIcon3Url: speciality.trainingTextIcon3.file.url,
    trainingTextTitle3: speciality.trainingTextTitle3,
    trainingTextBody3: speciality.trainingTextBody3.content[0].content[0].value
  }
}

const Speciality = ({
  data: {
    contentfulSpeciality: speciality,
    allContentfulMeetupEvent: { edges: events },
    videoIcon,
    filteredPosts
  },
  location
}) => {
  const {
    relatedProjects,
    title,
    clients,
    communityBackground,
    communityLogo,
    communityText,
    eventIcon,
    contactText
  } = speciality

  const { edges: postEdges = [] } = filteredPosts
  const posts = postEdges.map(({ node }) => node)
  const talks = getExternalType(speciality, `Talk`)
  const tutorials = getExternalType(speciality, `Tutorial`)
  const books = getExternalType(speciality, `Book`)
  const specialityEvents = events ? getSpecialityEvents(title, events) : []
  const flattenedSpeciality = flattenSpeciality(speciality)

  return (
    <Layout backgroundColor="blue" location={location}>
      <Head page={speciality} />
      <IntroSection speciality={flattenedSpeciality} />
      <ProjectsSection
        related={relatedProjects}
        title={title}
        clients={clients}
      />
      <TrainingSection speciality={flattenedSpeciality} />
      <CommunitySection
        background={communityBackground}
        logo={communityLogo}
        text={communityText}
        title={title}
      />
      <EventSection
        events={specialityEvents}
        title={title}
        eventIcon={eventIcon}
      />
      <TalksSection talks={talks} videoIcon={videoIcon} />
      <BlogListing
        title="Blog posts"
        description={`${title} articles created by members of YLD for the community.`}
        posts={posts}
      />
      {tutorials && tutorials.length ? (
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
      contactText
    }

    allContentfulMeetupEvent {
      edges {
        node {
          id
          eventTitle
          date
          linkToEvent
        }
      }
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

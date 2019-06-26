import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { isAfter, endOfYesterday } from 'date-fns'
import _ from 'lodash'

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
    slug: _.get(speciality, 'slug', null),
    title: _.get(speciality, 'title', null), // required
    seoTitle: _.get(speciality, 'seoTitle', null), // required
    seoMetaDescription: _.get(speciality, 'seoMetaDescription', null), // required
    seoText: _.get(speciality, 'seoText.content[0].content[0].value', null), // required
    introGraphicTitle: _.get(speciality, 'introGraphic.title', null), // required
    introGraphicFileUrl: _.get(speciality, 'introGraphic.file.url', null), // required
    introTitle: _.get(speciality, 'introTitle', null), // required
    introTextTitle1: _.get(speciality, 'introTextTitle1', null), // required
    introTextBody1: _.get(
      speciality,
      'introTextBody1.content[0].content[0].value',
      null
    ), // required
    introTextTitle2: _.get(speciality, 'introTextTitle2', null), // required
    introTextBody2: _.get(
      speciality,
      'introTextBody2.content[0].content[0].value',
      null
    ), // required
    introTextTitle3: _.get(speciality, 'introTextTitle3', null), // required
    introTextBody3: _.get(
      speciality,
      'introTextBody3.content[0].content[0].value',
      null
    ), // required
    trainingIntroText: _.get(
      speciality,
      'trainingIntroText.content[0].content[0].value',
      null
    ), // required
    trainingTextIcon1Title: _.get(speciality, 'trainingTextIcon1.title', null), // required
    trainingTextIcon1Url: _.get(speciality, 'trainingTextIcon1.file.url', null), // required
    trainingTextTitle1: _.get(speciality, 'trainingTextTitle1', null), // required
    trainingTextBody1: _.get(
      speciality,
      'trainingTextBody1.content[0].content[0].value',
      null
    ), // required
    trainingTextIcon2Title: _.get(speciality, 'trainingTextIcon2.title', null), // required
    trainingTextIcon2Url: _.get(speciality, 'trainingTextIcon2.file.url', null), // required
    trainingTextTitle2: _.get(speciality, 'trainingTextTitle2', null), // required
    trainingTextBody2: _.get(
      speciality,
      'trainingTextBody2.content[0].content[0].value',
      null
    ), // required
    trainingTextIcon3Title: _.get(speciality, 'trainingTextIcon3.title', null), // required
    trainingTextIcon3Url: _.get(speciality, 'trainingTextIcon3.file.url', null), // required
    trainingTextTitle3: _.get(speciality, 'trainingTextTitle3', null), // required
    trainingTextBody3: _.get(
      speciality,
      'trainingTextBody3.content[0].content[0].value',
      null
    ), // required
    communityText: _.get(
      speciality,
      'communityText.content[0].content[0].value',
      null
    ),
    communityLogoTitle: _.get(speciality, 'communityLogo.title', null),
    communityLogoUrl: _.get(speciality, 'communityLogo.file.url', null),
    communityBackgroundTitle: _.get(
      speciality,
      'communityBackground.title',
      null
    ),
    communityBackgroundUrl: _.get(
      speciality,
      'communityBackground.file.url',
      null
    ),
    eventIconTitle: _.get(speciality, 'eventIcon.title', null),
    eventIconUrl: _.get(speciality, 'eventIcon.file.url', null),
    contactText: _.get(speciality, 'contactText', null) // required
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
  const { relatedProjects, clients, eventIcon } = speciality

  const flattenedSpeciality = flattenSpeciality(speciality)

  const {
    title,
    communityBackgroundTitle,
    communityBackgroundUrl,
    communityText,
    communityLogoTitle,
    communityLogoUrl,
    contactText
  } = flattenedSpeciality

  const { edges: postEdges = [] } = filteredPosts
  const posts = postEdges.map(({ node }) => node)
  const talks = getExternalType(speciality, `Talk`)
  const tutorials = getExternalType(speciality, `Tutorial`)
  const books = getExternalType(speciality, `Book`)
  const specialityEvents = events ? getSpecialityEvents(title, events) : []

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
        backgroundTitle={communityBackgroundTitle}
        backgroundUrl={communityBackgroundUrl}
        logoTitle={communityLogoTitle}
        logoUrl={communityLogoUrl}
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

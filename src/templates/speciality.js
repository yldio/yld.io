import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { isAfter, endOfYesterday } from 'date-fns'
import Get from 'lodash.get'
import Ajv from 'ajv'

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
// import NotFoundPage from '../pages/404'

const ajv = new Ajv({ allErrors: true, verbose: true })

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
    slug: Get(speciality, 'slug', undefined),
    title: Get(speciality, 'title', undefined), // required
    seoTitle: Get(speciality, 'seoTitle', undefined), // required
    seoMetaDescription: Get(speciality, 'seoMetaDescription', undefined), // required
    seoText: Get(speciality, 'seoText.content[0].content[0].value', undefined), // required
    introGraphicTitle: Get(speciality, 'introGraphic.title', undefined), // required
    introGraphicFile: Get(speciality, 'introGraphic', undefined), // required
    introTitle: Get(speciality, 'introTitle', undefined), // required
    introTextTitle1: Get(speciality, 'introTextTitle1', undefined), // required
    introTextBody1: Get(
      speciality,
      'introTextBody1.content[0].content[0].value',
      undefined
    ), // required
    introTextTitle2: Get(speciality, 'introTextTitle2', undefined), // required
    introTextBody2: Get(
      speciality,
      'introTextBody2.content[0].content[0].value',
      undefined
    ), // required
    introTextTitle3: Get(speciality, 'introTextTitle3', undefined), // required
    introTextBody3: Get(
      speciality,
      'introTextBody3.content[0].content[0].value',
      undefined
    ), // required
    trainingIntroText: Get(
      speciality,
      'trainingIntroText.content[0].content[0].value',
      undefined
    ), // required
    trainingTextIcon1Title: Get(
      speciality,
      'trainingTextIcon1.title',
      undefined
    ), // required
    trainingTextIcon1: Get(speciality, 'trainingTextIcon1', undefined), // required
    trainingTextTitle1: Get(speciality, 'trainingTextTitle1', undefined), // required
    trainingTextBody1: Get(
      speciality,
      'trainingTextBody1.content[0].content[0].value',
      undefined
    ), // required
    trainingTextIcon2Title: Get(
      speciality,
      'trainingTextIcon2.title',
      undefined
    ), // required
    trainingTextIcon2: Get(speciality, 'trainingTextIcon2', undefined), // required
    trainingTextTitle2: Get(speciality, 'trainingTextTitle2', undefined), // required
    trainingTextBody2: Get(
      speciality,
      'trainingTextBody2.content[0].content[0].value',
      undefined
    ), // required
    trainingTextIcon3Title: Get(
      speciality,
      'trainingTextIcon3.title',
      undefined
    ), // required
    trainingTextIcon3: Get(speciality, 'trainingTextIcon3', undefined), // required
    trainingTextTitle3: Get(speciality, 'trainingTextTitle3', undefined), // required
    trainingTextBody3: Get(
      speciality,
      'trainingTextBody3.content[0].content[0].value',
      undefined
    ), // required
    communityText: Get(
      speciality,
      'communityText.content[0].content[0].value',
      undefined
    ),
    communityLogoTitle: Get(speciality, 'communityLogo.title', undefined),
    communityLogo: Get(speciality, 'communityLogo', undefined),
    communityBackgroundTitle: Get(
      speciality,
      'communityBackground.title',
      undefined
    ),
    communityBackground: Get(speciality, 'communityBackground', undefined),
    eventIconTitle: Get(speciality, 'eventIcon.title', undefined),
    eventIconUrl: Get(speciality, 'eventIcon.file.url', undefined),
    contactText: Get(speciality, 'contactText', undefined) // required
  }
}

const communitySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/product.schema.json',
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    communityText: {
      type: 'string'
    },
    communityLogoTitle: {
      type: 'string'
    },
    communityLogoUrl: {
      type: 'string'
    },
    communityBackgroundTitle: {
      type: 'string'
    }
  },
  dependencies: {
    communityLogoTitle: ['communityLogoUrl'],
    communityLogoUrl: ['communityLogoTitle']
  },
  required: ['title', 'communityText', 'communityBackgroundTitle']
}

const projectsSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'object',
    title: 'The Items Schema',
    required: [
      '__typename',
      'title',
      'slug',
      'introSentence',
      'posterColor',
      'posterImage'
    ],
    properties: {
      __typename: {
        $id: '#/items/properties/__typename',
        type: 'string',
        title: 'The __typename Schema',
        default: '',
        examples: ['ContentfulTemplatedCaseStudy'],
        pattern: '^(.*)$'
      },
      title: {
        $id: '#/items/properties/title',
        type: 'string',
        title: 'The Title Schema',
        default: '',
        examples: ['Migrating The Economist platform'],
        pattern: '^(.*)$'
      },
      slug: {
        $id: '#/items/properties/slug',
        type: 'string',
        title: 'The Slug Schema',
        default: '',
        examples: ['the-economist-creating-a-better-reading-experience'],
        pattern: '^(.*)$'
      },
      introSentence: {
        $id: '#/items/properties/introSentence',
        type: 'string',
        title: 'The Introsentence Schema',
        default: '',
        examples: [
          'We created a mobile-first, content-led, better reading experience for global digital users, improving the site architecture while delivering a more flexible solution.'
        ],
        pattern: '^(.*)$'
      },
      posterColor: {
        $id: '#/items/properties/posterColor',
        type: 'string',
        title: 'The Postercolor Schema',
        default: '',
        examples: ['E02A1B'],
        pattern: '^(.*)$'
      },
      posterImage: {
        $id: '#/items/properties/posterImage',
        type: 'object',
        title: 'The Posterimage Schema',
        required: ['title', 'file'],
        properties: {
          title: {
            $id: '#/items/properties/posterImage/properties/title',
            type: 'string',
            title: 'The Title Schema',
            default: '',
            examples: ['The Economist case study featured image '],
            pattern: '^(.*)$'
          },
          file: {
            $id: '#/items/properties/posterImage/properties/file',
            type: 'object',
            title: 'The File Schema',
            required: ['url'],
            properties: {
              url: {
                $id:
                  '#/items/properties/posterImage/properties/file/properties/url',
                type: 'string',
                title: 'The Url Schema',
                default: '',
                examples: [
                  '//images.ctfassets.net/22g1lenhck4z/SYVlouC4GiCMyIESK6ieY/d28fa4457c4d6e8bf6bac6603b2b5bfd/economist_export.svg'
                ],
                pattern: '^(.*)$'
              }
            }
          }
        }
      }
    }
  }
}

const clientSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'object',
    title: 'The Items Schema',
    required: ['id', 'title', 'file'],
    properties: {
      id: {
        $id: '#/items/properties/id',
        type: 'string',
        title: 'The Id Schema',
        default: '',
        examples: ['4084b31a-9b20-5e7b-ba23-8ec4a71e32ff'],
        pattern: '^(.*)$'
      },
      title: {
        $id: '#/items/properties/title',
        type: 'string',
        title: 'The Title Schema',
        default: '',
        examples: ['conde nast logo'],
        pattern: '^(.*)$'
      },
      file: {
        $id: '#/items/properties/file',
        type: 'object',
        title: 'The File Schema',
        required: ['url', 'fileName'],
        properties: {
          url: {
            $id: '#/items/properties/file/properties/url',
            type: 'string',
            title: 'The Url Schema',
            default: '',
            examples: [
              '//images.ctfassets.net/22g1lenhck4z/5QAIwaWizKc6Eq64uckG4a/db1b0b78464e82588cccb52a2a98528d/conde_nast.png'
            ],
            pattern: '^(.*)$'
          },
          fileName: {
            $id: '#/items/properties/file/properties/fileName',
            type: 'string',
            title: 'The Filename Schema',
            default: '',
            examples: ['conde_nast.png'],
            pattern: '^(.*)$'
          }
        }
      }
    }
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

  const validateCommunity = ajv.compile(communitySchema)
  const validateProjects = ajv.compile(projectsSchema)
  const validateClients = ajv.compile(clientSchema)

  const { title, contactText } = flattenedSpeciality

  const { edges: postEdges = [] } = filteredPosts
  const posts = postEdges.map(({ node }) => node)
  const talks = getExternalType(speciality, `Talk`)
  const tutorials = getExternalType(speciality, `Tutorial`)
  const books = getExternalType(speciality, `Book`)
  const specialityEvents = events ? getSpecialityEvents(title, events) : []

  // required: Head, IntroSection, TrainingSection, GetInTouch
  // optional: ProjectsSection, Community, Talks, BlogListing, Tutorials, Books

  return (
    <Layout backgroundColor="blue" location={location}>
      <Head page={flattenedSpeciality} />
      <IntroSection speciality={flattenedSpeciality} />
      {!!(
        (relatedProjects &&
          relatedProjects.length &&
          validateProjects(relatedProjects)) ||
        (clients && clients.length && validateClients(clients))
      ) && (
        <ProjectsSection
          related={relatedProjects}
          title={title}
          clients={clients}
        />
      )}
      <TrainingSection speciality={flattenedSpeciality} />
      {validateCommunity(flattenedSpeciality) && (
        <CommunitySection {...flattenedSpeciality} />
      )}
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
      ) : (
        undefined
      )}
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
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
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
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
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
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
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
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
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
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          fileName
          url
        }
      }
      communityBackground {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
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

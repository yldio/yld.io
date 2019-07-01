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
    introGraphicFileUrl: Get(speciality, 'introGraphic.file.url', undefined), // required
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
    trainingTextIcon1Url: Get(
      speciality,
      'trainingTextIcon1.file.url',
      undefined
    ), // required
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
    trainingTextIcon2Url: Get(
      speciality,
      'trainingTextIcon2.file.url',
      undefined
    ), // required
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
    trainingTextIcon3Url: Get(
      speciality,
      'trainingTextIcon3.file.url',
      undefined
    ), // required
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
    communityLogoUrl: Get(speciality, 'communityLogo.file.url', undefined),
    communityBackgroundTitle: Get(
      speciality,
      'communityBackground.title',
      undefined
    ),
    communityBackgroundUrl: Get(
      speciality,
      'communityBackground.file.url',
      undefined
    ),
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
    },
    communityBackgroundUrl: {
      type: 'string'
    }
  },
  dependencies: {
    communityLogoTitle: ['communityLogoUrl'],
    communityLogoUrl: ['communityLogoTitle']
  },
  required: [
    'title',
    'communityText',
    'communityBackgroundTitle',
    'communityBackgroundUrl'
  ]
}

// const specialityCoreSchema = {
//   definitions: {},
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   type: 'object',
//   title: 'The Root Schema',
//   required: [
//     'slug',
//     'title',
//     'seoTitle',
//     'seoMetaDescription',
//     'seoText',
//     'introGraphicTitle',
//     'introGraphicFileUrl',
//     'introTitle',
//     'introTextTitle1',
//     'introTextBody1',
//     'introTextTitle2',
//     'introTextBody2',
//     'introTextTitle3',
//     'introTextBody3',
//     'trainingIntroText',
//     'trainingTextIcon1Title',
//     'trainingTextIcon1Url',
//     'trainingTextTitle1',
//     'trainingTextBody1',
//     'trainingTextIcon2Title',
//     'trainingTextIcon2Url',
//     'trainingTextTitle2',
//     'trainingTextBody2',
//     'trainingTextIcon3Title',
//     'trainingTextIcon3Url',
//     'trainingTextTitle3',
//     'trainingTextBody3',
//     'communityText',
//     'communityBackgroundTitle',
//     'communityBackgroundUrl',
//     'eventIconTitle',
//     'eventIconUrl',
//     'contactText'
//   ],
//   properties: {
//     slug: {
//       $id: '#/properties/slug',
//       type: 'string',
//       title: 'The Slug Schema',
//       default: '',
//       examples: ['react-js'],
//       pattern: '^(.*)$'
//     },
//     title: {
//       $id: '#/properties/title',
//       type: 'string',
//       title: 'The Title Schema',
//       default: '',
//       examples: ['React.js'],
//       pattern: '^(.*)$'
//     },
//     seoTitle: {
//       $id: '#/properties/seoTitle',
//       type: 'string',
//       title: 'The Seotitle Schema',
//       default: '',
//       examples: ['React.js engineering, projects and react community | YLD'],
//       pattern: '^(.*)$'
//     },
//     seoMetaDescription: {
//       $id: '#/properties/seoMetaDescription',
//       type: 'string',
//       title: 'The Seometadescription Schema',
//       default: '',
//       examples: [
//         'React.js development projects with London based consultancy YLD. Our React.js developers offer expert consultancy and management of any project.'
//       ],
//       pattern: '^(.*)$'
//     },
//     seoText: {
//       $id: '#/properties/seoText',
//       type: 'string',
//       title: 'The Seotext Schema',
//       default: '',
//       examples: [
//         'React.js makes it painless to create and build encapsulated components that manage their own state, then compose them to make complex, interactive UIs.'
//       ],
//       pattern: '^(.*)$'
//     },
//     introGraphicTitle: {
//       $id: '#/properties/introGraphicTitle',
//       type: 'string',
//       title: 'The Intrographictitle Schema',
//       default: '',
//       examples: ['react logo'],
//       pattern: '^(.*)$'
//     },
//     introGraphicFileUrl: {
//       $id: '#/properties/introGraphicFileUrl',
//       type: 'string',
//       title: 'The Intrographicfileurl Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/3vFvX0N0kwAiwEIIyQUIw0/0321aa9f6f6bf647b2456d8a165777ac/React.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     introTitle: {
//       $id: '#/properties/introTitle',
//       type: 'string',
//       title: 'The Introtitle Schema',
//       default: '',
//       examples: ['Why use React.js?'],
//       pattern: '^(.*)$'
//     },
//     introTextTitle1: {
//       $id: '#/properties/introTextTitle1',
//       type: 'string',
//       title: 'The Introtexttitle1 Schema',
//       default: '',
//       examples: ['Maintainable'],
//       pattern: '^(.*)$'
//     },
//     introTextBody1: {
//       $id: '#/properties/introTextBody1',
//       type: 'string',
//       title: 'The Introtextbody1 Schema',
//       default: '',
//       examples: [
//         'The way React.js incentivises you to build applications makes them highly maintainable.'
//       ],
//       pattern: '^(.*)$'
//     },
//     introTextTitle2: {
//       $id: '#/properties/introTextTitle2',
//       type: 'string',
//       title: 'The Introtexttitle2 Schema',
//       default: '',
//       examples: ['Reusable'],
//       pattern: '^(.*)$'
//     },
//     introTextBody2: {
//       $id: '#/properties/introTextBody2',
//       type: 'string',
//       title: 'The Introtextbody2 Schema',
//       default: '',
//       examples: [
//         'Due to its component-based approach, all its elements are reusable and adaptable.'
//       ],
//       pattern: '^(.*)$'
//     },
//     introTextTitle3: {
//       $id: '#/properties/introTextTitle3',
//       type: 'string',
//       title: 'The Introtexttitle3 Schema',
//       default: '',
//       examples: ['Fast'],
//       pattern: '^(.*)$'
//     },
//     introTextBody3: {
//       $id: '#/properties/introTextBody3',
//       type: 'string',
//       title: 'The Introtextbody3 Schema',
//       default: '',
//       examples: [
//         'React.js is fast. Whether it’s for UI rendering or server-side rendering, it supports both with ease.'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingIntroText: {
//       $id: '#/properties/trainingIntroText',
//       type: 'string',
//       title: 'The Trainingintrotext Schema',
//       default: '',
//       examples: [
//         'Our expert engineers offer hands-on training and practical education to help you succeed in the ever-evolving technological landscape.'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon1Title: {
//       $id: '#/properties/trainingTextIcon1Title',
//       type: 'string',
//       title: 'The Trainingtexticon1title Schema',
//       default: '',
//       examples: ['icon on prem'],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon1Url: {
//       $id: '#/properties/trainingTextIcon1Url',
//       type: 'string',
//       title: 'The Trainingtexticon1url Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/3MKFTde4QgSM6Uy46g24OW/a34149ec4597aff25cb2527a041469c8/icon_on_prem.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextTitle1: {
//       $id: '#/properties/trainingTextTitle1',
//       type: 'string',
//       title: 'The Trainingtexttitle1 Schema',
//       default: '',
//       examples: ['On-premise classes'],
//       pattern: '^(.*)$'
//     },
//     trainingTextBody1: {
//       $id: '#/properties/trainingTextBody1',
//       type: 'string',
//       title: 'The Trainingtextbody1 Schema',
//       default: '',
//       examples: [
//         'Instructor-led, hands-on classes that cover open source technologies like, React.js, Node.js and Docker.'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon2Title: {
//       $id: '#/properties/trainingTextIcon2Title',
//       type: 'string',
//       title: 'The Trainingtexticon2title Schema',
//       default: '',
//       examples: ['icon certification'],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon2Url: {
//       $id: '#/properties/trainingTextIcon2Url',
//       type: 'string',
//       title: 'The Trainingtexticon2url Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/65eVhiMQJqooO06ICyumIE/241752913dbeb88899b688cdbc42dc32/icon_certification.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextTitle2: {
//       $id: '#/properties/trainingTextTitle2',
//       type: 'string',
//       title: 'The Trainingtexttitle2 Schema',
//       default: '',
//       examples: ['Certification programmes'],
//       pattern: '^(.*)$'
//     },
//     trainingTextBody2: {
//       $id: '#/properties/trainingTextBody2',
//       type: 'string',
//       title: 'The Trainingtextbody2 Schema',
//       default: '',
//       examples: [
//         'Assess the technical ability of your team with our certification programmes, designed to identify your outstanding talents.'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon3Title: {
//       $id: '#/properties/trainingTextIcon3Title',
//       type: 'string',
//       title: 'The Trainingtexticon3title Schema',
//       default: '',
//       examples: ['icon pair programming'],
//       pattern: '^(.*)$'
//     },
//     trainingTextIcon3Url: {
//       $id: '#/properties/trainingTextIcon3Url',
//       type: 'string',
//       title: 'The Trainingtexticon3url Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/4Mjcf90SAUKmqaqCYyE6iG/bc8c06103e236df6bbbcf1525ca89272/icon_pair_programming.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     trainingTextTitle3: {
//       $id: '#/properties/trainingTextTitle3',
//       type: 'string',
//       title: 'The Trainingtexttitle3 Schema',
//       default: '',
//       examples: ['Pair programming'],
//       pattern: '^(.*)$'
//     },
//     trainingTextBody3: {
//       $id: '#/properties/trainingTextBody3',
//       type: 'string',
//       title: 'The Trainingtextbody3 Schema',
//       default: '',
//       examples: [
//         'Your teams learn from seasoned professionals while delivering high quality, functional platforms.'
//       ],
//       pattern: '^(.*)$'
//     },
//     communityText: {
//       $id: '#/properties/communityText',
//       type: 'string',
//       title: 'The Communitytext Schema',
//       default: '',
//       examples: [
//         'At YLD we’re passionate about React.js and always look ways to give back to the community of React.js technology. We support many React.js initiatives, conferences and open source tools and have started our own communities - ReactFest conference and React.js Girls organisation. '
//       ],
//       pattern: '^(.*)$'
//     },
//     communityBackgroundTitle: {
//       $id: '#/properties/communityBackgroundTitle',
//       type: 'string',
//       title: 'The Communitybackgroundtitle Schema',
//       default: '',
//       examples: ['react logo'],
//       pattern: '^(.*)$'
//     },
//     communityBackgroundUrl: {
//       $id: '#/properties/communityBackgroundUrl',
//       type: 'string',
//       title: 'The Communitybackgroundurl Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/3vFvX0N0kwAiwEIIyQUIw0/0321aa9f6f6bf647b2456d8a165777ac/React.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     eventIconTitle: {
//       $id: '#/properties/eventIconTitle',
//       type: 'string',
//       title: 'The Eventicontitle Schema',
//       default: '',
//       examples: ['icon talks'],
//       pattern: '^(.*)$'
//     },
//     eventIconUrl: {
//       $id: '#/properties/eventIconUrl',
//       type: 'string',
//       title: 'The Eventiconurl Schema',
//       default: '',
//       examples: [
//         '//images.ctfassets.net/22g1lenhck4z/1OUF8Yd91qEOkyYsg0ekEI/1851ce2fc4ee64da35c9d70215df8fed/icon_upcoming_events.svg'
//       ],
//       pattern: '^(.*)$'
//     },
//     contactText: {
//       $id: '#/properties/contactText',
//       type: 'string',
//       title: 'The Contacttext Schema',
//       default: '',
//       examples: [
//         'Whether you need help with a project or are interested in training, we love to talk about all things React.'
//       ],
//       pattern: '^(.*)$'
//     }
//   }
// }

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
  // const validateSpecialityCore = ajv.compile(specialityCoreSchema)
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

  // if (validateSpecialityCore(flattenedSpeciality)) {

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
  // }

  // return <NotFoundPage></NotFoundPage>
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

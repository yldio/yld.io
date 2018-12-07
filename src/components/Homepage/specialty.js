import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { SmallerH2, H5, Paragraph } from '../components/Typography'
import Layout from '../components/layout'
import { format } from 'date-fns'
import StyledLink from '../components/styledLink'
import Posts from '../components/posts'
import Li from '../components/listItem'

import IntroSection from '../components/Speciality/intro'
import ProjectsSection from '../components/Speciality/projects'
import TrainingSection from '../components/Speciality/training'
import CommunitySection from '../components/Speciality/community'
import EventSection from '../components/Speciality/events'
import TalksSection from '../components/Speciality/talks'
import TalkToUsSection from '../components/Speciality/talkToUs'
import TutorialsSection from '../components/Speciality/tutorials'
import BooksSection from '../components/Speciality/books'

const Specialty = ({ data }) => {
  const specialty = data.allContentfulSpeciality.edges[0].node
  const site = data.site
  return (
    <Layout blue logoColour={specialty.logoColour}>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          specialty.title ? '- ' + specialty.title : ''
        } ${specialty.seoTitle ? '- ' + specialty.seoTitle : ''} `}
        meta={[
          {
            name: 'description',
            content: specialty.seoMetaDescription
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
      <IntroSection specialty={specialty} />
      <ProjectsSection specialty={specialty} />
      <TrainingSection specialty={specialty} />
      <CommunitySection specialty={specialty} />
      <EventSection specialty={specialty} />
      <TalksSection specialty={specialty} />
      <Grid className="grid">
        <Padding vertical={{ desktop: 4, mobile: 3.5 }}>
          <Row>
            <Col md={6} sm={12} xs={12}>
              <SmallerH2>{`From the blog`}</SmallerH2>
              <Paragraph>{`${
                specialty.title
              } articles created by members of YLD for the community.`}</Paragraph>
            </Col>
            <Col md={4} xs={12}>
              <Padding top={1}>
                <Posts>
                  {posts => (
                    <ul>
                      {posts.slice(0, 3).map(({ node }) => (
                        <Li key={`${node.id}`} fullWidth>
                          <H5 bold>
                            <a
                              href={`https://medium.com/yld-engineering-blog/${
                                node.uniqueSlug
                              }`}
                            >
                              {node.title}
                            </a>
                          </H5>
                          {format(new Date(node.createdAt), 'MMMM DD[,] dddd')}
                        </Li>
                      ))}
                    </ul>
                  )}
                </Posts>
              </Padding>
              <Padding top={3}>
                <StyledLink href="https://medium.com/yld-engineering-blog">
                  More articles
                </StyledLink>
              </Padding>
            </Col>
          </Row>
        </Padding>
      </Grid>
      <TutorialsSection specialty={specialty} />
      <BooksSection specialty={specialty} />
      <TalkToUsSection
        title={specialty.title}
        contactText={specialty.contactText}
      />
    </Layout>
  )
}

export default Specialty

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

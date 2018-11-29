import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H5, Paragraph } from '../components/Typography'
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
import TalkToUsSection from '../components/Speciality/talkToUs'
import BlueBackground from '../components/BlueBG'

const Video = styled.iframe`
  width: ${remcalc(854)};
  height: ${remcalc(480)};
  margin: auto;
  box-shadow: 5px 10px ${props => props.theme.colors.white};
`

const Specialty = ({ data }) => {
  const specialty = data.allContentfulSpeciality.edges[0].node
  const site = data.site
  console.log(specialty)
  return (
    <Layout blue>
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
      <BlueBackground>
        <Grid className="grid">
          <Row>
            <Col md={12}>
              <H1 reverse>{`Talks`}</H1>
              <Video
                src="https://www.youtube.com/embed/yToHjxhCeYM"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </Col>
          </Row>
        </Grid>
      </BlueBackground>
      <Grid className="grid">
        <Row>
          <Col md={6} sm={12} xs={12}>
            <H1>{`From the blog`}</H1>
            <Paragraph>{`${
              specialty.title
            } articles created by members of YLD for the community.`}</Paragraph>
          </Col>
          <Col md={4} xs={12}>
            <Posts>
              {posts => (
                <ul>
                  {posts.slice(0, 3).map(({ node }) => (
                    <Li key={`${node.id}`}>
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
            <Padding top={3}>
              <StyledLink href="https://medium.com/yld-engineering-blog">
                More articles
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Grid>
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
      }
    }
  }
`

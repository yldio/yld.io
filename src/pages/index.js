import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'

import { H2, Paragraph, H6, H4 } from '../components/Typography'
import Layout from '../components/layout'
import StyledLink from '../components/styledLink'
import Flex from 'styled-flex-component'

import SEOText from '../components/Homepage/seoText'
import Companies from '../components/Homepage/companies'
import Blog from '../components/Homepage/blog'
import Events from '../components/Homepage/events'
import Jobs from '../components/Homepage/jobs'
import CaseStudy from '../components/Homepage/caseStudy'

const CardHeader = styled.header`
  padding: 24px 36px 22px 36px;
  max-width: 475px;
  box-sizing: border-box;

  > div {
    max-width: 310px;
  }
`
function isEven (value) {
  if (value % 2 === 0) return true
  else return false
}

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events }
}) => (
  <Layout>
    <CaseStudy caseStudy={content.pIckedCaseStudy} />
    <Padding bottom={6} />
    <Padding bottom={4} />
    <SEOText text={content.seoText.content[0].content} />
    <Padding bottom={4} />
    <Companies companies={content.companies} />
    <Padding bottom={5} />
    <Row>
      {content.services.map((service, index) => (
        <Col key={service.id} xs={12} sm={6}>
          {!isEven(index) ? <Padding top={7} /> : null}
          <H2>{service.title}</H2>
          <Paragraph>{service.introSentence.introSentence}</Paragraph>
          <Row>
            <Col xs={7}>
              <H6>
                {service.homePageSpecialities.map(s => s.title).join(' / ')}
              </H6>
            </Col>
          </Row>
          <StyledLink to={`speciality/${service.slug}`}>Learn More</StyledLink>
          <Padding bottom={2} />
          <CardHeader
            style={{
              background: `#${service.caseStudies[0].posterColor}`
            }}
          >
            <div>
              <Paragraph reverse muted>
                Case Study
              </Paragraph>
              <H4 noMargin reverse>
                {service.caseStudies[0].title}
              </H4>
            </div>
          </CardHeader>
          <Flex
            justifyCenter
            alignCenter
            style={{
              background: `#${service.caseStudies[0].posterColor}`,
              width: 475,
              height: 473
            }}
          >
            <img
              alt={service.caseStudies[0].posterColor.title}
              src={service.caseStudies[0].posterImage.file.url}
            />
          </Flex>
        </Col>
      ))}
    </Row>
    <Padding top={5} />
    <Events events={events.edges} />
    <Padding top={5} bottom={4} />
    <Blog />
    <Jobs />
  </Layout>
)

export const query = graphql`
  query {
    contentfulHomepage {
      pIckedCaseStudy {
        title
        slug
        posterImage {
          file {
            url
          }
        }
        posterColor
        body {
          content {
            content {
              value
              nodeType
            }
          }
        }
      }
      seoText {
        content {
          content {
            data {
              uri
            }
            value
            content {
              value
              nodeType
            }
            nodeType
          }
        }
      }
      services {
        id
        title
        slug
        caseStudies {
          title
          posterColor
          posterImage {
            file {
              url
            }
          }
        }
        introSentence {
          introSentence
        }
        homePageSpecialities {
          title
        }
      }
      companies {
        id
        file {
          url
          fileName
        }
      }
    }
    allContentfulMeetupEvent {
      edges {
        node {
          color
          posterImage {
            file {
              url
            }
          }
          homepageFeatured
          id
          eventTitle
          date
          linkToEvent
          blurb {
            blurb
          }
        }
      }
    }
  }
`

export default IndexPage

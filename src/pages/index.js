import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { format, isAfter, isSameDay, endOfYesterday } from 'date-fns'
import styled from 'styled-components'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
// import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import StyledLink from '../components/Common/StyledLink'
import Image from '../components/Common/Image'
import GreyBackground from '../components/Common/GreyBackground'
import BlueBackground from '../components/Common/BlueBackground'
import Statement from '../components/Common/Statement'
import LogoGrid from '../components/Common/LogoGrid'
import Services from '../components/Homepage/services'
import Events from '../components/Homepage/events/index'
import LatestPosts from '../components/LatestPosts'
import BlogListing from '../components/Common/BlogListing'
import Jobs from '../components/Homepage/jobs'
import eventLabels from '../utils/eventLabels'

/**
 * Importing fragments here to have them available to the entire
 * GraphQL schema
 */
// eslint-disable-next-line no-unused-vars
import { fragments } from '../fragments'
import { SectionTitle, CardTitle, Subtitle } from '../components/Typography'

const dateFormat = 'dddd[,] MMMM DD'

const getHomepageMeetups = (events = []) =>
  events
    .filter(
      n => !n.node.homepageFeatured && isAfter(n.node.date, endOfYesterday())
    )
    .sort((a, b) => (a.node.date <= b.node.date ? -1 : 1))
    .slice(0, 5)
    .map(n => ({
      ...n.node,
      date: format(n.node.date, dateFormat)
    }))

const getFeaturedEventDate = ({ node: { date, endTime } }) =>
  !isSameDay(date, endTime) && isAfter(endTime, date)
    ? `${format(date, dateFormat)} - ${format(endTime, dateFormat)}`
    : format(date, dateFormat)

const getHomepageConferences = (events = []) =>
  events
    .filter(n => n.node.homepageFeatured)
    .slice(0, 1)
    .map(n => ({
      ...n.node,
      date: getFeaturedEventDate(n)
    }))

const StyledBlueBackground = styled(BlueBackground)`
  padding-top: ${remcalc(36)};
  margin-top: -${remcalc(36)};
`

const IntroRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[8]};
`

const StyledCardTitle = styled(CardTitle)`
  display: inline-block;
  text-decoration: underline;
`

const IntroLinkWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const IntroSectionTitleWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const IntroImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`

const IndexPage = ({ data, location }) => {
  const {
    intro_illustration,
    contentfulHomepage: content,
    allContentfulMeetupEvent: events
  } = data
  console.log({ data })
  const featuredEvent = getHomepageConferences(events.edges)[0]
  const nonFeaturedEvents = getHomepageMeetups(events.edges)
  const [first, toggle] = useState(true)

  const introCopy = first
    ? "We're a technology company that builds great technology  companies"
    : 'Creating technology capabilities for you, that lasts beyond us.'
  return (
    <Layout location={location} bgColor="blueBg">
      <Head page={content} />
      <StyledBlueBackground>
        <Grid>
          <IntroRow style={{ position: 'relative' }}>
            <IntroImage image={intro_illustration.childImageSharp} />
            <Col width={(1, 1, 1, 1, 1, 7 / 12)}>
              <IntroSectionTitleWrapper>
                <SectionTitle reverse as="h1">
                  {introCopy}
                </SectionTitle>
              </IntroSectionTitleWrapper>
              <Subtitle reverse muted>
                What we offer
              </Subtitle>
              <IntroLinkWrapper>
                <StyledCardTitle
                  noPaddingTop
                  as={Link}
                  reverse
                  to="/engineering"
                >
                  Software engineering consultancy
                </StyledCardTitle>
                <br />
                <StyledCardTitle noPaddingTop as={Link} reverse to="/design">
                  Design consultancy
                </StyledCardTitle>
                <br />
                <StyledCardTitle noPaddingTop as={Link} reverse to="/training">
                  Training
                </StyledCardTitle>
              </IntroLinkWrapper>
              <StyledLink
                as="p"
                reverse
                to="/our-work"
                onClick={() => toggle(!first)}
              >
                See our work
              </StyledLink>
            </Col>
          </IntroRow>
        </Grid>
      </StyledBlueBackground>
      <Statement richText={content.seoText.content[0].content} />
      <GreyBackground>
        <Grid>
          <Padding bottom={{ smallPhone: 2, smallTablet: 4, desktop: 4 }}>
            <LogoGrid companies={content.companies} />
          </Padding>
        </Grid>
      </GreyBackground>
      <Grid>
        <Services services={content.services} />
      </Grid>
      <GreyBackground>
        <Grid>
          <Padding bottom={{ smallPhone: 4, smallTablet: 5 }} top={4}>
            <Events
              nonFeaturedEvents={nonFeaturedEvents}
              featuredEvent={featuredEvent}
            />
          </Padding>
        </Grid>
      </GreyBackground>
      <LatestPosts>
        {posts => (
          <BlogListing
            title="From the blog"
            posts={posts.map(({ node }) => node).slice(0, 3)}
          />
        )}
      </LatestPosts>
      <GreyBackground>
        <Jobs />
      </GreyBackground>
    </Layout>
  )
}

export const query = graphql`
  query {
    intro_illustration: file(
      relativePath: { eq: "landing_page_illustration.png" }
    ) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    contentfulHomepage {
      title
      seoTitle
      seoMetaDescription
      featuredCaseStudy {
        id
        title
        slug
        posterImage {
          title
          file {
            url
          }
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        posterColor
        introSentence {
          introSentence
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
        pageReady
        caseStudies {
          ... on Node {
            ... on ContentfulNonTemplatedCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulNonTemplatedCaseStudyV2 {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulTemplatedCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        introSentence {
          introSentence
        }
        homePageSpecialities {
          id
          slug
          title
        }
      }
      companies {
        id
        title
        file {
          url
        }
        fluid(maxWidth: 250) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
    allContentfulMeetupEvent {
      edges {
        node {
          color
          posterImage {
            title
            file {
              url
            }
            fluid(maxWidth: 610) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          homepageFeatured
          id
          eventTitle
          date
          endTime
          ctaText
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

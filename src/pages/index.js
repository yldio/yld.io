import React from 'react'
import { Link, graphql } from 'gatsby'
import { format } from 'date-fns'
import { Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import { H2, H4, Paragraph, H3, H6 } from '../components/Typography'
import Layout from '../components/layout'
import Jobs from '../components/jobs'
import Posts from '../components/posts'
import StyledLink from '../components/styledLink'
import styled from 'styled-components'
import remcalc from 'remcalc'

const Li = styled.li`
  position: relative;
  padding-bottom: ${remcalc(30)};
  margin-bottom: ${remcalc(30)};
  line-height: ${remcalc(24)};

  &:after {
    content: '';
    width: ${remcalc(60)};
    height: ${remcalc(1)};
    background: ${props => props.theme.colors.greyBg};
    bottom: 0;
    display: block;
    position: absolute;
  }

  & span {
    display: block;
    color: ${props => props.theme.colors.lightGray};
  }
`

const ImageWrapper = styled(Col)`
  position: absolute;
  right: 0;
  margin-right: ${remcalc(-20)};
  height: ${remcalc(540)};
  width: ${remcalc(540)};
  padding: 0;
`

const WrapperRow = styled(Row)`
  min-height: ${remcalc(540)};
  align-items: center;
`

const EventTitle = styled(H3)`
  font-size: ${remcalc(30)};
  padding: ${remcalc(12)} 0 0 0;
`

const EventWrapper = styled.header`
  padding-top: ${remcalc(24)};
  padding-left: ${remcalc(36)};

  span {
    color: ${props => props.theme.colors.lightGray};
    display: block;
  }
`

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events }
}) => (
  <Layout>
    <WrapperRow>
      <Col xs={5}>
        <H2>{content.pIckedCaseStudy.title}</H2>
        <Paragraph>
          {content.pIckedCaseStudy.body.content[0].content[0].value}
        </Paragraph>
        <StyledLink to={`/case-study/${content.pIckedCaseStudy.slug}`}>
          Learn More
        </StyledLink>
      </Col>
      <ImageWrapper xs={7}>
        <Flex
          justifyEnd
          alignCenter
          full
          style={{ background: `#${content.pIckedCaseStudy.posterColor}` }}
        >
          <img
            alt={content.pIckedCaseStudy.title}
            src={content.pIckedCaseStudy.posterImage.file.url}
          />
        </Flex>
      </ImageWrapper>
    </WrapperRow>
    <Padding bottom={6} />
    <Padding bottom={4} />
    <Row>
      <Col xs={10}>
        <H3>{content.seoText.content[0].content[0].value}</H3>
      </Col>
    </Row>
    <Padding bottom={4} />
    <Row>
      {content.companies.map(company => (
        <Col
          xs={3}
          key={company.id}
          style={{ height: 108, display: 'flex', alignItems: 'center' }}
        >
          <img src={company.file.url} alt={company.file.fileName} />
        </Col>
      ))}
    </Row>
    <Padding bottom={5} />
    <Row>
      <Col xs={6}>
        <H2>Engineering</H2>
        <Paragraph>
          We modernise both practices and software. Applying expertise in a
          range of programming languages and an inherent culture of innovation.
        </Paragraph>
        <Row>
          <Col xs={7}>
            <H6>
              Node.js / React.js / React Native / Kubernetes / GraphQL / Vue.js
              / TypeScript
            </H6>
          </Col>
        </Row>
        <Link to={'/'}>Learn More</Link>
        <Padding bottom={2} />
        CARD
      </Col>
      <Col xs={6}>
        <Padding top={7} />
        <H2>Design</H2>
        <Paragraph>
          We create with you, not for you. Guiding your product together towards
          beautiful, functional longevity.
        </Paragraph>
        <Row>
          <Col xs={7}>
            <H6>
              Product strategy / UX/UI / Visual design / Design systems and
              Brand design
            </H6>
          </Col>
        </Row>
        <Link to={'/'}>Learn More</Link>
        <Padding bottom={2} />
        CARD
      </Col>
    </Row>
    <Padding top={5} />
    <Row>
      <Col md={4} xs={12}>
        <H2>Upcoming Events</H2>
        <ul>
          {events.edges
            .splice(0, 3)
            .filter(n => !n.node.homepageFeatured)
            .map(({ node }) => (
              <Li key={`${node.id}`}>
                <H4>{node.eventTitle}</H4>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
              </Li>
            ))}
        </ul>
      </Col>
      <Col md={8} xs={12}>
        {events.edges.filter(n => n.node.homepageFeatured).map(({ node }) => (
          <Flex
            key={node.id}
            alignStart
            justifyBetween
            full
            column
            style={{ background: `#${node.color}` }}
          >
            <EventWrapper>
              <span>Featured</span>
              <EventTitle reverse>{node.eventTitle}</EventTitle>
              <span>{node.blurb.blurb}</span>
              <StyledLink reverse href={node.linkToEvent}>
                Buy Tickets
              </StyledLink>
            </EventWrapper>
            <img alt={node.eventName} src={node.posterImage.file.url} />
          </Flex>
        ))}
      </Col>
    </Row>
    <Padding top={5} bottom={4} />
    <Row>
      <Col md={6} xs={12}>
        <H2>From the blog</H2>
      </Col>
      <Col md={6} xs={12}>
        <Posts>
          {posts => (
            <ul>
              {posts.splice(0, 3).map(({ node }) => (
                <Li key={`${node.id}`}>
                  <H4>{node.title}</H4>
                  {format(new Date(node.createdAt), 'MMMM DD[,] dddd')}
                </Li>
              ))}
            </ul>
          )}
        </Posts>
        <Padding top={3}>
          <StyledLink href="https://medium.com/yld-engineering-blog">
            More Articles
          </StyledLink>
        </Padding>
      </Col>
    </Row>
    <Padding top={4}>
      <Row>
        <Col xs={12}>
          <H2>Join Our Team</H2>
        </Col>
      </Row>
      <Padding top={3}>
        <Row>
          <Jobs>
            {jobs =>
              Object.keys(jobs).map(key => (
                <Col
                  md={4}
                  sm={6}
                  xs={12}
                  key={`${key}-${jobs[key].length}-main`}
                >
                  <H4>{key}</H4>

                  <ul>
                    {jobs[key].splice(0, 3).map(job => (
                      <Li key={`${job.id}`}>
                        <a
                          rel="noopener noreferrer"
                          href={job.hostedUrl}
                          target="_blank"
                        >
                          {job.text.split(' - ')[0]}
                        </a>
                        <span>{job.categories.commitment}</span>
                      </Li>
                    ))}
                  </ul>
                </Col>
              ))
            }
          </Jobs>
        </Row>
        <Row>
          <Col xs={12}>
            <Padding top={2}>
              <StyledLink
                href="https://jobs.lever.co/yld"
                rel="noopener noreferrer"
                target="_blank"
              >
                View all openings
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Padding>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
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
            value
            nodeType
          }
        }
      }
      services {
        title
        introSentence {
          introSentence
        }
        homePageSpecialities {
          title
          slug
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

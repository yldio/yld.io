import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { navigate } from '@reach/router'

import { Grid, Row, Col, ColumnLayout } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import TitleSection from '../components/ContactUs/TitleSection'
import GreyBackground from '../components/Common/GreyBackground'
import AreasOfInterest from '../components/ContactUs/AreasOfInterest'
import { Checkbox, Input, Label, Field } from '../components/Common/Forms'
import Button from '../components/Common/Button'
import Statement from '../components/Common/Statement'
import LatestPosts from '../components/LatestPosts'
import BlogListing from '../components/Common/BlogListing'
import { CaseStudyWrapper, CaseStudy } from '../components/Common/CaseStudy'
import EventSection from '../components/Common/Events'
import { Section } from '../components/JoinUs/elements'
import colorLuminance from 'color-luminance'

const MAX_CASE_STUDIES = 3

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

const LinkUnderline = styled(Link)`
  text-decoration: underline;
`
/* Utility function to convert an HEX color into the RGB format */
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/* Returns the luminance (in a 0-255 range) of a color in the HEX format */
const getColorLuminance = hexColor => {
  const rgbValue = hexToRgb(`#${hexColor}`)

  return colorLuminance(rgbValue.r, rgbValue.g, rgbValue.b)
}

const getBranch = (
  branch,
  engineeringMsg,
  communityMsg,
  caseStudies,
  events,
  eventsSectionDescription,
  eventsSectionImage
) => {
  switch (branch) {
    case 'community':
      return (
        <Fragment>
          <Statement noPadding richText={communityMsg.content[0].content} />
          <EventSection
            events={events}
            description={eventsSectionDescription}
            eventIcon={eventsSectionImage.file.url}
          />
          <LatestPosts>
            {posts => (
              <BlogListing
                title="From the blog"
                posts={posts.map(({ node }) => node).slice(0, 3)}
              />
            )}
          </LatestPosts>
        </Fragment>
      )

    default:
      return (
        <Fragment>
          <Statement noPadding richText={engineeringMsg.content[0].content} />
          <Section px={[0, 0, 0, 0, 0, 0, 0]}>
            <ColumnLayout
              cols={3}
              items={caseStudies.slice(0, MAX_CASE_STUDIES)}
              compensated
            >
              {({ Col, item: cs }) => (
                <Col block={false}>
                  <CaseStudyWrapper top={3}>
                    <CaseStudy
                      bg={`#${cs.posterColor}`}
                      to={`/case-study/${cs.slug}`}
                      lightText={getColorLuminance(cs.posterColor) < 127.5}
                      title={cs.title}
                      services={cs.services}
                    />
                  </CaseStudyWrapper>
                </Col>
              )}
            </ColumnLayout>
          </Section>
        </Fragment>
      )
  }
}

const formatCaseStudies = caseStudies =>
  caseStudies.edges.map(caseStudyObject => {
    const caseStudy = caseStudyObject.node
    return {
      ...caseStudy,
      services: caseStudy.services
        .filter(service => service.title)
        .map(service => service.title)
    }
  })

// NOT CHANGED TO HOOKS BECAUSE YOU DONT WIN ANYTHING
class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false,
    triedSubmitting: false
  }

  handleChangeCheckbox = (e, branch) => {
    const target = e.target
    this.setState(prevState => ({
      ...prevState,
      [target.name]: {
        checked: target.checked,
        branch: branch
      }
    }))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ submitting: true })

    const strippedState = Object.assign({}, this.state)
    delete strippedState.name
    delete strippedState.email
    delete strippedState.message
    delete strippedState.submitting
    delete strippedState.triedSubmitting
    delete strippedState.privacy

    // if you tick and untick a field, it remains in state as 'false'; we want ot filter those out
    const strippedFilteredState =
      Object.keys(strippedState).length > 0
        ? Object.keys(strippedState).filter(item => {
            return strippedState[item]
          })
        : []

    const branches =
      strippedFilteredState.length > 0
        ? strippedFilteredState.reduce((acc, current) => {
            return (acc = [...acc, this.state[current].branch])
          }, [])
        : ['engineering']

    const uniqueBranches = Array.from(new Set(branches))

    const chosenBranch =
      uniqueBranches.length > 1 ? 'engineering' : uniqueBranches[0]

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encode({
        'form-name': 'contact',
        ...this.state
      })
    }).then(() => {
      this.setState({ success: true, submitting: false, branch: chosenBranch })
      navigate(`?branch=${chosenBranch}`, {
        replace: true
      })
      window.scrollTo(0, 0)
    })
  }

  handleButtonClick = () => {
    this.setState({ triedSubmitting: true })
  }

  render() {
    const { name, email, message, submitting, success, branch } = this.state
    const {
      location,
      data: {
        contentfulPage: {
          title,
          slug,
          seoTitle,
          seoMetaDescription,
          titleNotContacted,
          labelInterests,
          interests,
          labelYourMessage,
          labelYourName,
          labelYourEmail,
          privacyPolicyText,
          privacyPolicyLinkText,
          statusNotSent,
          statusSent,
          customMessage1,
          customMessage2,
          thankYouMessage
        },
        contentfulOpenSourcePage: {
          eventsSectionImage,
          eventsSectionDescription
        },
        allContentfulMeetupEvent: { edges: events },
        allContentfulTemplatedCaseStudy,
        allContentfulNonTemplatedCaseStudy
      }
    } = this.props

    const engineeringCaseStudies = formatCaseStudies(
      allContentfulTemplatedCaseStudy
    )
    const designCaseStudies = formatCaseStudies(
      allContentfulNonTemplatedCaseStudy
    )
    const caseStudies = engineeringCaseStudies.concat(designCaseStudies)

    return (
      <Layout location={location}>
        <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
          style={{ width: '100%' }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <TitleSection
            title={
              success
                ? thankYouMessage.content[0].content[0].value
                : titleNotContacted
            }
          />
          <GreyBackground>
            <Grid>
              <Padding
                top={{ smallPhone: 3, tablet: 4 }}
                bottom={{ smallPhone: 3.5, tablet: 5 }}
              >
                {success ? (
                  // call a function getBranch, written outside the class, to show the correct branch
                  getBranch(
                    branch,
                    customMessage1,
                    customMessage2,
                    caseStudies,
                    events,
                    eventsSectionDescription,
                    eventsSectionImage
                  )
                ) : (
                  <Fragment>
                    <AreasOfInterest
                      title={labelInterests}
                      interests={interests}
                      onChange={this.handleChangeCheckbox}
                    />
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
                        <Label htmlFor="message">{labelYourMessage}</Label>
                        <Input
                          as="textarea"
                          noBoxShadow={!this.state.triedSubmitting}
                          rows="4"
                          value={message}
                          onChange={this.handleChange}
                          id="message"
                          name="message"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 5 / 12]}>
                        <Label htmlFor="name">{labelYourName}</Label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={name}
                          onChange={this.handleChange}
                          required
                        />
                        <Label htmlFor="email">{labelYourEmail}</Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          required
                        />
                        <Field>
                          <section key="privacy">
                            <Checkbox
                              required
                              type="checkbox"
                              id="privacy"
                              name="privacy"
                              onChange={this.handleChangeCheckbox}
                            />
                            <label htmlFor="privacy">
                              {privacyPolicyText}
                              <LinkUnderline
                                to={'/privacy-policy'}
                                title="yld Privacy Policy"
                              >
                                {privacyPolicyLinkText}
                              </LinkUnderline>
                            </label>
                          </section>
                        </Field>
                        <Button
                          onClick={this.handleButtonClick}
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting ? statusSent : statusNotSent}
                        </Button>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </Padding>
            </Grid>
          </GreyBackground>
        </form>
      </Layout>
    )
  }
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              services {
                ... on ContentfulService {
                  title
                }
              }
              posterColor
            }
          }
        }
        allContentfulNonTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              services {
                ... on ContentfulService {
                  title
                }
              }
              posterColor
            }
          }
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
        contentfulOpenSourcePage {
          eventsSectionImage {
            id
            title
            file {
              fileName
              url
            }
          }
        }
        contentfulPage(slug: { eq: "contact" }) {
          title
          slug
          seoTitle
          seoMetaDescription
          titleNotContacted
          titleContacted
          labelInterests
          interests {
            label
            name
            branch
          }
          labelYourMessage
          labelYourName
          labelYourEmail
          privacyPolicyText
          privacyPolicyLinkText
          statusNotSent
          statusSent
          successMessage
          customMessage1 {
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
          customMessage2 {
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
          thankYouMessage {
            content {
              content {
                nodeType
                value
              }
              nodeType
            }
            nodeType
          }
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact

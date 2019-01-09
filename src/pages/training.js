import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import is from 'styled-is'
import { graphql } from 'gatsby'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'

import { Grid, Row, Col } from '../components/grid'
import { H2, Paragraph } from '../components/Typography'
import Layout from '../components/layout'
import Image from '../components/Common/Image'
import StyledLink from '../components/styledLink'
import SEOText from '../components/Homepage/seoText'
import CaseStudy from '../components/Homepage/caseStudy'
import GrayBackground from '../components/GreyBG'
import TalkToUsSection from '../components/Speciality/talkToUs'

const Hr = styled.hr`
  height: 1px;
  border: none;
  opacity: 0.2;
  background-color: #ffffff;

  ${is('small')`
    width: 76px;
  `};
`

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: transform 0.3s, opacity 0.3s;
  transform: scale(0.7);
  visibility: hidden;

  ${is('visible')`
    transform: scale(1);
    opacity: 1;
    visibility: visible;
    overflow: scroll;
  `};
`

const Close = styled.button`
  border: none;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  background-color: #333333;
  color: white;
  right: 90px;
  top: 36px;
  position: absolute;
  font-size: 28px;
  font-weight: 200;
  position: fixed;
`

class TrainingPage extends Component {
  state = {
    modalContent: null
  }

  toggleModal = modalContent => {
    if (modalContent) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'absolute'

      return this.setState({
        modalContent
      })
    }
    document.body.style.overflow = 'auto'
    document.body.style.position = 'inherit'

    return this.setState({
      modalContent
    })
  }

  render() {
    const {
      data: { contentfulTrainingPage: content, site }
    } = this.props
    const { modalContent } = this.state
    const trainingApproachesContent = [
      content.trainingApproachContent1.trainingApproachContent1,
      content.trainingApproachContent2.trainingApproachContent2,
      content.trainingApproachContent3.trainingApproachContent3
    ]
    const courseCategories = Array.from(
      new Set(content.courses.map(c => c.category))
    )

    return (
      <Layout>
        <Helmet
          title={`${site.siteMetadata.title} ${
            content.seoTitle ? '- ' + content.seoTitle : ''
          } `}
          meta={[{ name: 'description', content: content.seoMetaDescription }]}
        >
          <html lang="en" />
        </Helmet>

        <Modal visible={modalContent}>
          {modalContent && (
            <Padding top={{ smallPhone: 5 }} bottom={{ smallPhone: 5 }}>
              <Close onClick={() => this.toggleModal(null)}>X</Close>
              <Grid>
                <Row>
                  <Col width={[1, 1, 1, 1, 1 / 2]}>
                    <Image image={modalContent.logo} />
                    <Padding bottom={2}>
                      <H2>{modalContent.name}</H2>
                    </Padding>
                    <Paragraph bold>Level</Paragraph>
                    <Paragraph>{modalContent.level}</Paragraph>
                    <Paragraph bold>Pre-requisites</Paragraph>
                    <Paragraph>{modalContent.preRequisites}</Paragraph>
                    <Paragraph bold>Pre-requisite Courses</Paragraph>
                    <Paragraph>{modalContent.preRequisitesCourses}</Paragraph>
                    <Padding top={48}>
                      <StyledLink to="/contact">Contact us</StyledLink>
                    </Padding>
                  </Col>
                  <Col width={[1, 1, 1, 1, 1 / 2]}>
                    <Padding top={4}>
                      <ReactMarkdown
                        renderers={{
                          paragraph: props => <Paragraph {...props} />,
                          strong: props => <Paragraph bold {...props} />
                        }}
                        source={modalContent.description.description}
                      />
                    </Padding>
                  </Col>
                </Row>
              </Grid>
            </Padding>
          )}
        </Modal>

        <Grid>
          <Padding bottom={{ smallPhone: 0, smallTablet: 2, desktop: 2 }}>
            <CaseStudy
              caseStudy={content.featuredCaseStudy}
              subHeading="Featured work"
            />
          </Padding>
          <Padding bottom={{ smallPhone: 0, desktop: 2 }} />
        </Grid>
        <GrayBackground>
          <Grid>
            <Padding top={{ smallPhone: 2 }} />
            <Padding
              top={{ smallPhone: 4, smallTablet: 4, desktop: 4 }}
              bottom={4}
            >
              <SEOText text={content.seoText.content[0].content} />
            </Padding>
          </Grid>
        </GrayBackground>
        <GrayBackground style={{ background: '#090329' }}>
          <Padding top={{ smallPhone: 4 }} bottom={{ smallPhone: 4 }}>
            <Grid>
              <Row>
                <Col width={[1, 1, 1, 1, 1 / 2]}>
                  <H2 style={{ maxWidth: 250 }} reverse>
                    Our training approach
                  </H2>
                </Col>
                <Col width={[1, 1, 1, 1, 1 / 2]}>
                  {content.trainingApproachTitle.map((approach, i) => (
                    <Padding bottom={2} key={i}>
                      <Paragraph reverse bold>
                        {approach}
                      </Paragraph>
                      <Paragraph reverse muted>
                        {trainingApproachesContent[i]}
                      </Paragraph>
                    </Padding>
                  ))}
                </Col>
              </Row>
              <Padding top={{ smallPhone: 48 }} bottom={{ smallPhone: 4 }}>
                <Hr />
              </Padding>
              <Row>
                <Col width={[1]}>
                  <H2 reverse>Our training formats</H2>
                </Col>
              </Row>
            </Grid>
          </Padding>
          <Grid>
            <Row>
              {content.trainingFormats.map(format => (
                <Col width={[1, 1, 1, 1, 1 / 3]} key={format.id}>
                  <Padding bottom={1}>
                    <img
                      src={`https://${format.icon.file.url}`}
                      alt={format.icon.title}
                    />
                  </Padding>
                  <Paragraph bold reverse>
                    {format.title}
                  </Paragraph>
                  <Paragraph muted reverse>
                    {format.description}
                  </Paragraph>
                  <Padding top={1} style={{ maxWidth: '80%' }}>
                    {format.bulletPoints.map((point, i) => (
                      <Padding top={1} bottom={1} key={i}>
                        <Paragraph muted reverse>
                          {point}
                        </Paragraph>
                        <Padding top={0.5}>
                          <Hr small />
                        </Padding>
                      </Padding>
                    ))}
                  </Padding>
                </Col>
              ))}
            </Row>
            <Padding bottom={5} />
          </Grid>
        </GrayBackground>
        <Grid>
          <Row>
            <Col width={[1]}>
              <Padding bottom={{ smallPhone: 4 }} top={{ smallPhone: 5 }}>
                <H2>Course catalog</H2>
              </Padding>
            </Col>
            {courseCategories.map((cat, i) => {
              const courseInCat = content.courses.filter(
                a => a.category === cat
              )
              return (
                <Col width={[1, 1, 1, 1, 1 / 2]} key={i}>
                  <Padding bottom={4}>
                    <Padding bottom={1}>
                      <Image image={courseInCat[0].logo} />
                      <H2>{cat}</H2>
                    </Padding>
                    <Flex column alignStart>
                      {courseInCat.map((course, id) => (
                        <StyledLink
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.toggleModal(course)}
                          key={id}
                        >
                          <Paragraph>{course.name}</Paragraph>
                        </StyledLink>
                      ))}
                    </Flex>
                  </Padding>
                </Col>
              )
            })}
          </Row>
        </Grid>
        <TalkToUsSection
          contactTitle={content.contactUsTitle}
          contactText={content.contactUsText.contactUsText}
        />
        <Grid>
          {content.relatedCaseStudy ? (
            <Padding top={5} bottom={5}>
              <CaseStudy
                subHeading="Featured work"
                caseStudy={content.relatedCaseStudy}
              />
            </Padding>
          ) : null}
        </Grid>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    contentfulTrainingPage {
      title
      seoTitle
      seoMetaDescription
      contactUsText {
        contactUsText
      }
      contactUsTitle
      trainingApproachTitle
      trainingApproachContent1 {
        trainingApproachContent1
      }
      trainingApproachContent2 {
        trainingApproachContent2
      }
      trainingApproachContent3 {
        trainingApproachContent3
      }
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
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
        posterColor
        introSentence
      }
      seoText {
        content {
          content {
            value
            nodeType
          }
        }
      }
      trainingFormats {
        id
        title
        description
        bulletPoints
        icon {
          title
          file {
            url
          }
        }
      }
      courses {
        name
        technology
        level
        category
        preRequisites
        preRequisitesCourses
        logo {
          fluid(maxWidth: 680) {
            ...GatsbyContentfulFluid_tracedSVG
          }
          title
          file {
            url
          }
        }
        description {
          description
        }
      }
      relatedCaseStudy {
        title
        slug
        posterImage {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_tracedSVG
          }
          title
          file {
            url
          }
        }
        posterColor
        introSentence
      }
    }
  }
`

export default TrainingPage

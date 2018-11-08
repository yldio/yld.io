import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Margin, Padding } from 'styled-components-spacing'
import { H1, Paragraph, H5, H6 } from '../components/Typography'
import CaseStudyBottom from '../components/Homepage/caseStudy'
import Layout from '../components/layout'
import breakpoint from 'styled-components-breakpoint'

const Stat = styled(H1)`
  font-size: ${remcalc(72)};
  padding-bottom: 0 !important; /* sorry */
`

const ImageWrapper = styled(Col)`
  max-height: ${remcalc(540)};
  width: ${remcalc(540)};
`

const Comma = styled.span`
  margin-right: ${remcalc(6)};
  margin-left: ${remcalc(3)};
`

const NoMobile = styled.section`
  display: none;

  ${breakpoint('tablet')`
    display: block;
  `};
`

const last = (i, a) => i + 1 === a.length

const MetaData = ({ caseStudy }) => (
  <Flex justifyBetween>
    <Flex column>
      <H5 small bold noMargin>
        Technology used
      </H5>
      <Flex alignCenter wrap>
        {caseStudy.technologyUsed &&
          caseStudy.technologyUsed.map((tech, i) => (
            <Fragment key={tech.id}>
              <H6 noMargin>{tech.title}</H6>
              {last(i, caseStudy.technologyUsed) ? '' : <Comma>, </Comma>}
            </Fragment>
          ))}
      </Flex>
    </Flex>
    <Flex column>
      <H5 small bold noMargin>
        Services provided
      </H5>
      <Flex alignCenter wrap>
        {caseStudy.services &&
          caseStudy.services.map((service, i) => (
            <Fragment key={service.id}>
              <H6 noMargin noUnderline>
                {service.title}
              </H6>
              {last(i, caseStudy.services) ? '' : <Comma>,</Comma>}
            </Fragment>
          ))}
      </Flex>
    </Flex>
  </Flex>
)

const CaseStudy = ({ data: { allContentfulCaseStudy, site } }) => {
  const caseStudy = allContentfulCaseStudy.edges[0].node

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          caseStudy.title ? '- ' + caseStudy.title : ''
        } ${caseStudy.seoTitle ? '- ' + caseStudy.seoTitle : ''} `}
        meta={[{ name: 'description', content: caseStudy.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <Flex full column justifyCenter>
              <H1 noTop>{caseStudy.title}</H1>
              <NoMobile>
                <MetaData caseStudy={caseStudy} />
              </NoMobile>
            </Flex>
          </Col>
          {caseStudy.posterImage && (
            <ImageWrapper sm={6} xs={12}>
              <img alt={caseStudy.title} src={caseStudy.posterImage.file.url} />
            </ImageWrapper>
          )}
          <Col xs={12} sm={false}>
            <Padding top={2}>
              <MetaData caseStudy={caseStudy} />
            </Padding>
          </Col>
        </Row>
        <Margin bottom={4} />
        <Row>
          <Col xs={12} sm={9} md={7}>
            {caseStudy.body.content
              .filter(
                c =>
                  c.content[0] &&
                  c.content[0].marks &&
                  !c.content[0].marks.length
              )
              .slice(0, 2)
              .map(
                (c, i) =>
                  c.content[0] && (
                    <Paragraph padded key={i}>
                      {c.content[0].value}
                    </Paragraph>
                  )
              )}
          </Col>
        </Row>
        <Margin bottom={4} top={3}>
          <Row center="md">
            <Col xs={12} md={10}>
              {caseStudy.body.content
                .filter(
                  c =>
                    c.content[0] &&
                    c.content[0].marks &&
                    c.content[0].marks.length
                )
                .map(
                  (c, i) =>
                    c.content[0] && (
                      <div
                        className="video-container"
                        dangerouslySetInnerHTML={{ __html: c.content[0].value }}
                      />
                    )
                )}
            </Col>
          </Row>
        </Margin>
        <Row>
          <Col xs={12} sm={9} md={7}>
            {caseStudy.body.content
              .filter(
                c =>
                  c.content[0] &&
                  c.content[0].marks &&
                  !c.content[0].marks.length
              )
              .slice(2)
              .map(
                (c, i) =>
                  c.content[0] && (
                    <Paragraph padded key={i}>
                      {c.content[0].value}
                    </Paragraph>
                  )
              )}
          </Col>
          <Col md={3} sm={12} mdOffset={1}>
            {caseStudy.stats &&
              caseStudy.stats.map(stat => (
                <Fragment key={stat.id}>
                  <Stat>{stat.value}</Stat>
                  <H5 bold>{stat.label}</H5>
                </Fragment>
              ))}
          </Col>
        </Row>
        <Padding bottom={5} />
        <Row>
          <Col xs={12}>
            <Padding top={4} bottom={2}>
              <Paragraph>More of our work</Paragraph>
            </Padding>
          </Col>
        </Row>
        <Row />
        <Padding bottom={5}>
          <CaseStudyBottom caseStudy={caseStudy.relatedCaseStudy} />
        </Padding>
      </Grid>
    </Layout>
  )
}

export default CaseStudy

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          relatedCaseStudy {
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
          technologyUsed {
            title
            id
          }
          services {
            title
            id
          }
          stats {
            id
            label
            value
          }
          posterColor
          body {
            content {
              nodeType
              content {
                value
                marks {
                  type
                }
              }
            }
          }
          posterImage {
            file {
              url
            }
          }
          seoTitle
          seoMetaDescription
        }
      }
    }
  }
`

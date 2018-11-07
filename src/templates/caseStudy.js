import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Row, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Margin } from 'styled-components-spacing'
import { H1, Paragraph, H5, H6 } from '../components/Typography'
import Layout from '../components/layout'

const Stat = styled(H1)`
  font-size: ${remcalc(72)};
  padding-bottom: 0 !important; /* sorry */
`

const ImageWrapper = styled(Col)`
  position: absolute;
  right: 0;
  height: ${remcalc(540)};
  width: ${remcalc(540)};
  padding: 0;
`

const CaseStudy = ({ data: { allContentfulCaseStudy, site } }) => {
  const caseStudy = allContentfulCaseStudy.edges[0].node

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title} - ${caseStudy.title} - ${
          caseStudy.seoTitle
        } `}
        meta={[{ name: 'description', content: caseStudy.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Row>
        <Col xs={12} sm={9} md={7}>
          <H1 noTop>{caseStudy.title}</H1>
          <Flex justifyBetween>
            <Flex column>
              <H5 small bold>
                Technology used
              </H5>
              {caseStudy.technologyUsed &&
                caseStudy.technologyUsed.map(tech => (
                  <H6 key={tech.id}>{tech.title}</H6>
                ))}
            </Flex>
            <Flex column>
              <H5 small bold>
                Services provided
              </H5>
              <H6>Consulting, Dedicated teams</H6>
            </Flex>
          </Flex>
        </Col>
        {caseStudy.posterImage && (
          <ImageWrapper xs={6}>
            <Flex justifyEnd alignCenter>
              <img alt={caseStudy.title} src={caseStudy.posterImage.file.url} />
            </Flex>
          </ImageWrapper>
        )}
      </Row>
      <Margin bottom={7} />
      <Row>
        <Col xs={12} sm={9} md={7}>
          {caseStudy.body.content
            .filter(
              c =>
                c.content[0] && c.content[0].marks && !c.content[0].marks.length
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
                c.content[0] && c.content[0].marks && !c.content[0].marks.length
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
          technologyUsed {
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
        }
      }
    }
  }
`

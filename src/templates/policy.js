import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Row, Col, Grid } from '../components/grid'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'
import { makeText } from '../utils/makeText'
import Head from '../components/Common/Head'
import BodyPrimary from '../components/Typography/BodyPrimary'

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  line-height: 1.5;
`

const Title = styled.h1`
  font-size: ${remcalc(42)};
  line-height: ${remcalc(42)};
  font-weight: 500;
`
const Section = styled.section`
  margin-bottom: 10px;
`

const renderParagraphs = content =>
  makeText(content).map(cont => <p key={cont.trim()}>{cont}</p>)

const Policy = ({ data: { contentfulPolicy: policy }, location }) => {
  const { seoMetaData, title, body, section } = policy

  return (
    <Layout location={location}>
      <Head seoMetaData={seoMetaData} />
      <Padding top={4} bottom={5}>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <Padding bottom={{ smallPhone: 2, phone: 2 }}>
                <Title>{title}</Title>
              </Padding>
            </Col>
            <Col>
              {body && body.body && (
                <ReactMarkdown renderers={{ paragraph: BodyPrimary }}>
                  {body.body}
                </ReactMarkdown>
              )}
              {section &&
                section.length &&
                section.map(({ title, content: { content } }) => (
                  <Section key={title}>
                    <SectionTitle>{title}</SectionTitle>
                    {renderParagraphs(content)}
                  </Section>
                ))}
            </Col>
          </Row>
        </Grid>
      </Padding>
    </Layout>
  )
}

export default Policy

export const pageQuery = graphql`
  query($id: String) {
    contentfulPolicy(id: { eq: $id }) {
      slug
      title
      body {
        body
      }
      section {
        title
        content {
          content
        }
      }
      seoMetaData {
        ...SEOMetaFields
      }
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'

import { Row, Col, Grid } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import BodyPrimary from '../components/Typography/BodyPrimary'

const Title = styled.h1`
  font-size: ${remcalc(42)};
  line-height: ${remcalc(42)};
  font-weight: 500;
`

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  line-height: 1.5;
`

const List = styled.ul`
  margin-left: 1rem;
`

const Policy = ({ data: { contentfulPolicy: policy }, location }) => {
  const { seoMetaData, title, body } = policy

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
                <ReactMarkdown
                  renderers={{
                    paragraph: BodyPrimary,
                    heading: SectionTitle,
                    list: List
                  }}
                >
                  {body.body}
                </ReactMarkdown>
              )}
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
      seoMetaData {
        ...SEOMetaFields
      }
    }
  }
`

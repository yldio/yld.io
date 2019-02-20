import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import { Margin } from 'styled-components-spacing'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import remcalc from 'remcalc'

import { SectionTitle, BodyPrimary } from '../components/Typography'
import Button from '../components/Common/Button'
import Layout from '../components/layout'

const HomePageLink = styled(Button)`
  width: ${remcalc(145)};
  display: flex;
  justify-content: center;
`

const NotFoundPage = ({ data: { site }, location }) => (
  <Layout location={location}>
    <Helmet
      title={`${site.siteMetadata.title} - Not Found`}
      meta={[
        {
          name: 'description',
          content: 'YLD - Engineering - Digital, NodeJS, React, AWS'
        }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Grid>
      <Margin top={6} bottom={7}>
        <Row>
          <Col xs={12} sm={8} md={6}>
            <SectionTitle as="h1">Oops, nothing to see here</SectionTitle>
            <BodyPrimary>
              The link is broken or the page has been removed. You might find
              what you are looking for from our home page.
            </BodyPrimary>
            <Margin top={1}>
              <HomePageLink as={Link} to={'/'}>
                Home
              </HomePageLink>
            </Margin>
          </Col>
        </Row>
      </Margin>
    </Grid>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

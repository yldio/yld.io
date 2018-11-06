import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Margin } from 'styled-components-spacing'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
// eslint-disable-next-line
import styled, { withComponent } from 'styled-components'
import remcalc from 'remcalc'

import { H1, Paragraph } from '../components/Typography'
import { Button } from '../components/forms'
import Layout from '../components/layout'

const LinkStyled = Button.withComponent(Link)

const HomePageLink = styled(LinkStyled)`
  width: ${remcalc(145)};
  display: flex;
  justify-content: center;
`

const NotFoundPage = ({ data: { site } }) => (
  <Layout>
    <Helmet
      title={`${site.siteMetadata.title} - Not Found
      } `}
      meta={[
        {
          name: 'description',
          content: 'YLD - Engineering - Digital, NodeJS, React, AWS'
        }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Margin top={6} bottom={7}>
      <Row>
        <Col xs={12} sm={8} md={6}>
          <H1>Oops, nothing to see here</H1>
          <Paragraph>
            The link is broken or the page has been removed. You might find what
            you are looking for from our home page
          </Paragraph>
          <Margin top={1}>
            <HomePageLink to={'/'}>Home</HomePageLink>
          </Margin>
        </Col>
      </Row>
    </Margin>
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

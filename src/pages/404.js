import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import breakpoint from 'styled-components-breakpoint'
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

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const StyledCol = styled(Col)`
  ${breakpoint('tablet')`
    margin: ${({ theme }) => theme.space[8]}
  `}
`

const NotFoundPage = ({ data: { site }, location }) => (
  <Layout location={location}>
    <Helmet
      title={`${site.siteMetadata.siteTitle} - Not Found`}
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
      <Row style={{ justifyContent: 'center' }}>
        <StyledCol width={[1, 1, 1, 1, 1, 8 / 12]}>
          <SectionTitle as="h1">Oops, nothing to see here</SectionTitle>
          <StyledBodyPrimary>
            The link is broken or the page has been removed. You might find what
            you are looking for from our home page.
          </StyledBodyPrimary>
          <HomePageLink as={Link} to={'/'}>
            Home
          </HomePageLink>
        </StyledCol>
      </Row>
    </Grid>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
  }
`

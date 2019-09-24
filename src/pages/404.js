import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import breakpoint from 'styled-components-breakpoint'
import { Link, StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import remcalc from 'remcalc'
import ReactMarkdown from 'react-markdown'

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
  margin: ${({ theme }) => theme.space[5]} 0;

  ${breakpoint('tablet')`
    margin: ${({ theme }) => theme.space[8]} 0
  `}
`

const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            siteTitle
          }
        }
        contentful404Page {
          title
          copy {
            copy
          }
          ctaLink
          ctaCopy
          footerContactUsProfile {
            id
          }
        }
      }
    `}
    render={({ site, contentful404Page: content }) => {
      const {
        footerContactUsProfile: { id },
        title,
        copy: { copy },
        ctaLink,
        ctaCopy
      } = content
      return (
        <Layout footerContactUsId={id}>
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
            <Row>
              <StyledCol width={[1]}>
                <SectionTitle as="h1">{title}</SectionTitle>
                <ReactMarkdown
                  renderers={{
                    // eslint-disable-next-line
                    paragraph: props => <StyledBodyPrimary {...props} />
                  }}
                  source={copy}
                />
                <HomePageLink as={Link} to={ctaLink}>
                  {ctaCopy}
                </HomePageLink>
              </StyledCol>
            </Row>
          </Grid>
        </Layout>
      )
    }}
  />
)

export default NotFoundPage

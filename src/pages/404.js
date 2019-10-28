import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import breakpoint from 'styled-components-breakpoint'
import { Link, StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import remcalc from 'remcalc'
import ReactMarkdown from 'react-markdown'

import BlueBackground from '../components/Common/BlueBackground'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import Layout from '../components/layout'

import { LogoStyleContext } from '../context/PageContext'

import illustration from '../images/404-illustration.svg'

// Layout

const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(36)};
`

const StyledRow = styled(Row)`
  align-items: center;
`

const TextCol = styled(Col).attrs({
  width: [1, 1, 1, 1, 0.5, 0.5]
})`
  padding-top: ${({ theme }) => theme.space[4]};
  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[8]};
  `}
`

const IllustrationCol = styled(Col).attrs({
  width: [1, 1, 1, 1, 0.5, 0.5]
})`
  ${breakpoint('smallTablet', 'tablet')`
    padding-top: ${({ theme }) => theme.space[4]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

// Paragraphs / Texts

const TitleHeadline = props => (
  <SectionTitle {...props} as="h1" reverse="true" />
)

const CopyText = props => <BodyPrimary {...props} reverse="true" />

const LinksTitle = styled(BodyPrimary).attrs({
  reverse: 'true',
  bold: 'true'
})`
  padding-top: ${({ theme }) => theme.space[3]};
`

const LinkParagraph = props => (
  <BodyPrimary {...props} reverse="true" noPaddingBottom="true" />
)

const NotFoundPageLink = styled(Link)`
  text-decoration: underline;
`

// Page

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
          linksTitle
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
        linksTitle
      } = content
      return (
        <LogoStyleContext.Provider value="white">
          <Layout is404={true} bgColor="blueBg" footerContactUsId={id}>
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
            <StyledBlueBackground>
              <Grid>
                <StyledRow>
                  <TextCol>
                    <TitleHeadline>{title}</TitleHeadline>
                    <ReactMarkdown
                      renderers={{
                        paragraph: CopyText
                      }}
                      source={copy}
                    />
                    <LinksTitle>{linksTitle}</LinksTitle>
                    <LinkParagraph>
                      <NotFoundPageLink to="/">Home</NotFoundPageLink>
                    </LinkParagraph>
                    <LinkParagraph>
                      <NotFoundPageLink to="/our-work/">
                        Our work
                      </NotFoundPageLink>
                    </LinkParagraph>
                    <LinkParagraph>
                      <NotFoundPageLink to="/contact/">
                        Contact
                      </NotFoundPageLink>
                    </LinkParagraph>
                  </TextCol>
                  <IllustrationCol>
                    <img src={illustration} alt="" />
                  </IllustrationCol>
                </StyledRow>
              </Grid>
            </StyledBlueBackground>
          </Layout>
        </LogoStyleContext.Provider>
      )
    }}
  />
)

export default NotFoundPage

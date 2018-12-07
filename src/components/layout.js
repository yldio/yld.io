import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import './layout.css'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'
import Footer from './Footer'
import BlueBackground from './BlueBG'
import google from '../utils/google-json.json'

const Layout = ({ children, location, blue, logoColour }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Helmet
            title={`${data.site.siteMetadata.title}`}
            meta={[{ name: 'description', content: '' }]}
          >
            <script type="application/ld+json">{`
                ${JSON.stringify(google)}
            `}</script>
            <html lang="en" />
          </Helmet>
          {blue && (
            <BlueBackground>
              <Header blue logoColour={logoColour} />
            </BlueBackground>
          )}
          {!blue && <Header logoColour={logoColour} />}
          {children}
          <Footer />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout

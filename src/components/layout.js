import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import './layout.css'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'
import Footer from './Footer'
import google from '../utils/google-json.json'

const Layout = ({ children, location }) => (
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
          <Header />
          <main>{children}</main>
          <Footer />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

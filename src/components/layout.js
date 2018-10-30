import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import Header from './header'
import './layout.css'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'

const Layout = ({ children }) => (
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
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' }
            ]}
          >
            <html lang="en" />
          </Helmet>

          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              paddingTop: 0
            }}
          >
            <Padding all={2}>{children}</Padding>
          </div>
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

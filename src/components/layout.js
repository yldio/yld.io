import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import './layout.css'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'
import Footer from './Footer'
import Cookie from './Common/CookieBanner'
import google from '../utils/google-json.json'

class Layout extends React.Component {
  state = { cookiesAllowed: true }

  componentDidMount() {
    this.setState({ cookiesAllowed: Boolean(localStorage.getItem('cookies')) })
  }

  handleClick = () => {
    this.setState({ cookiesAllowed: true })
    localStorage.setItem('cookies', true)
  }

  render() {
    const { children } = this.props
    return (
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
              {children}
              <Footer />
              <GlobalStyle />
              {!this.state.cookiesAllowed && (
                <Cookie onClick={this.handleClick} />
              )}
            </Fragment>
          </ThemeProvider>
        )}
      />
    )
  }
}

export default Layout

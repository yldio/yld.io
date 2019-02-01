import React, { Fragment, Component } from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import Header from './Header'
import './layout.css'
import BlueBackground from './BlueBG'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'
import Footer from './Footer'
import GreyBackground from './GreyBG'
import google from '../utils/google-json.json'
import Cookie from './Common/CookieBanner'

class Layout extends Component {
  state = { cookiesAllowed: true }

  componentDidMount() {
    this.setState({ cookiesAllowed: Boolean(localStorage.getItem('cookies')) })
  }

  handleClick = () => {
    this.setState({ cookiesAllowed: true })
    localStorage.setItem('cookies', true)
  }

  render() {
    const { children, backgroundColor, logoColour, blue } = this.props
    const Component = (() => {
      if (backgroundColor === 'blue' || blue) return BlueBackground
      if (backgroundColor === 'grey') return GreyBackground

      return Fragment
    })()

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
              <Location>
                {({ location }) => (
                  <Component>
                    <Header
                      path={location.pathname}
                      blue={backgroundColor === 'blue'}
                      logoColour={logoColour}
                    />
                  </Component>
                )}
              </Location>
              <main>{children}</main>
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

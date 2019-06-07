import React, { Fragment, Component } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import remcalc from 'remcalc'
import { hotjar } from 'react-hotjar'

import Header from './Header'
import './layout.css'
import BlueBackground from './Common/BlueBackground'
import theme from '../utils/theme'
import GlobalStyle from '../utils/globalStyle'
import Footer from './Footer'
import GreyBackground from './Common/GreyBackground'
import google from '../utils/google-json.json'
import Cookie from './Common/CookieBanner'

const { GATSBY_ENVIRONMENT, HOTJAR_ID, HOTJAR_SCRIPT_VERSION = 6 } = process.env

const googleJson = JSON.stringify(google)

const isDevEnvironment =
  GATSBY_ENVIRONMENT === 'development' || GATSBY_ENVIRONMENT === 'preview'

const StyledMain = styled.main`
  padding-top: ${remcalc(120)};
`

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cookiesAllowed: true,
      GridDebugger: null
    }
  }

  async componentDidMount() {
    this.setState({ cookiesAllowed: Boolean(localStorage.getItem('cookies')) })

    if (isDevEnvironment) {
      const {
        default: component
      } = await import(/* webpackChunkName: "grid-debugger" */ 'react-grid-debugger')

      this.setState({
        GridDebugger: component
      })
    }
  }

  handleClick = () => {
    this.setState({ cookiesAllowed: true })
    localStorage.setItem('cookies', true)
  }

  render() {
    const { children, backgroundColor, blue } = this.props
    const Component = (() => {
      if (backgroundColor === 'blue' || blue) return BlueBackground
      if (backgroundColor === 'grey') return GreyBackground

      return Fragment
    })()

    const { GridDebugger } = this.state

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
                ${googleJson}
            `}</script>
                <html lang="en" />

                {HOTJAR_ID
                  ? hotjar.initialize(HOTJAR_ID, HOTJAR_SCRIPT_VERSION)
                  : null}
              </Helmet>
              <Location>
                {({ location }) => (
                  <Component>
                    <Header
                      path={location.pathname}
                      blue={backgroundColor === 'blue'}
                    />
                  </Component>
                )}
              </Location>
              {GridDebugger && (
                <GridDebugger
                  theme={theme}
                  maxWidth={['none', 'none', '480px', '1100px']}
                  numCols={[1, 1, 1, 12]}
                  gutter={['24px', '36px', '36px', '42px', '48px']}
                />
              )}
              <StyledMain>{children}</StyledMain>
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

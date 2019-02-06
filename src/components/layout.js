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

const { GATSBY_ENVIRONMENT } = process.env

const isDevEnvironment =
  GATSBY_ENVIRONMENT === 'development' || GATSBY_ENVIRONMENT === 'preview'

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
      } = await import(/* webpackChunkName: "grid-debugger" */ './Common/GridDebugger')

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
    const { children, backgroundColor, logoColour, blue } = this.props
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
              {GridDebugger && <GridDebugger />}
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

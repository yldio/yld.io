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
            title={`${data.site.siteMetadata.title}`}
            meta={[{ name: 'description', content: '' }]}
          >
            <html lang="en" />
            {/* Twitter Tracking */}
            <script>{`
                !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                // Insert Twitter Pixel ID and Standard Event data below
                twq('init','o0i7n');
                twq('track','PageView');
            `}</script>
            {/* a1 Webstats */}
            <script>{`
                var cid = 7135;
                (function() {
                window.a1WebStatsObj = 'a1w';
                window.a1w = window.a1w || function(){
                (window.a1w.q = window.ga.q || []).push(arguments)
                },
                window.a1w.l = 1 * new Date();
                var a = document.createElement('script');
                var m = document.getElementsByTagName('script')[0];
                a.async = 1;
                a.src = "https://api1.websuccess-data.com/tracker.js";
                m.parentNode.insertBefore(a,m)
                })()
            `}</script>
          </Helmet>
          <Header />
          {children}
          <Footer />
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

import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import remcalc from 'remcalc';

import Header from './Header';
import './layout.css';
import theme from '../utils/theme';
import GlobalStyle from '../utils/globalStyle';
import Footer from './Footer';
import google from '../utils/google-json.json';
import Cookie from './Common/CookieBanner';

const { GATSBY_ENVIRONMENT } = process.env;
const googleJson = JSON.stringify(google);

const isDevEnvironment =
  GATSBY_ENVIRONMENT === 'development' || GATSBY_ENVIRONMENT === 'preview';

const StyledMain = styled.main`
  padding-top: ${({ nonFixedHeader }) => (nonFixedHeader ? 0 : remcalc(120))};
`;

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cookiesAllowed: true,
      GridDebugger: null,
    };
  }

  async componentDidMount() {
    this.setState({ cookiesAllowed: Boolean(localStorage.getItem('cookies')) });

    if (isDevEnvironment) {
      const { default: component } = await import(
        /* webpackChunkName: "grid-debugger" */ 'react-grid-debugger'
      );

      this.setState({
        GridDebugger: component,
      });
    }
  }

  handleClick = () => {
    this.setState({ cookiesAllowed: true });
    localStorage.setItem('cookies', true);
  };

  render() {
    const {
      children,
      bgColor,
      displayFooterOffices = true,
      nonFixedHeader = false,
      headerChildren,
      footerContactUsId,
      slug,
      structuredData,
      breadcrumbData,
      is404 = false,
    } = this.props;

    const { GridDebugger } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                siteTitle
                siteUrl
              }
            }
          }
        `}
        render={(data) => {
          const homepageListItem = [
            {
              '@type': 'ListItem',
              item: {
                '@id': data.site.siteMetadata.siteUrl,
                name: 'Homepage',
              },
              position: 1,
            },
          ];

          const breadcrumbs = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            description: 'Breadcrumbs list',
            name: 'Breadcrumbs',
            itemListElement: [...homepageListItem, ...(breadcrumbData || [])],
          };

          return (
            <ThemeProvider theme={theme}>
              <>
                <Helmet
                  title={`${data.site.siteMetadata.siteTitle}`}
                  meta={[{ name: 'description', content: '' }]}
                >
                  <script type="application/ld+json">{`${googleJson}`}</script>
                  {structuredData && (
                    <script type="application/ld+json">{`${structuredData}`}</script>
                  )}

                  <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                  </script>
                  <html lang="en" />
                </Helmet>
                <Location>
                  {({ location }) =>
                    !(location && location.state && location.state.modal) && (
                      <Header
                        slug={slug}
                        path={location.pathname}
                        bgColor={bgColor}
                        nonFixed={nonFixedHeader}
                      >
                        {headerChildren}
                      </Header>
                    )
                  }
                </Location>
                {GridDebugger && (
                  <GridDebugger
                    theme={theme}
                    maxWidth={['none', 'none', '480px', '1100px']}
                    numCols={[1, 1, 1, 12]}
                    gutter={['24px', '36px', '36px', '42px', '48px']}
                  />
                )}
                <StyledMain nonFixedHeader={nonFixedHeader}>
                  {children}
                </StyledMain>
                <Location>
                  {({ location }) =>
                    !(location && location.state && location.state.modal) && (
                      <Footer
                        displayFooterOffices={displayFooterOffices}
                        footerContactUsId={footerContactUsId}
                        is404={is404}
                      />
                    )
                  }
                </Location>
                <GlobalStyle />
                {!this.state.cookiesAllowed && (
                  <Cookie onClick={this.handleClick} />
                )}
              </>
            </ThemeProvider>
          );
        }}
      />
    );
  }
}

export default Layout;

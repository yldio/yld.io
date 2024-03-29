import React from 'react';
import { graphql } from 'gatsby';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import styled from 'styled-components';

import { Grid, Row, Col } from '../components/grid';
import Layout from '../components/layout';
import Head from '../components/Common/Head';
import GreyBackground from '../components/Common/GreyBackground';
import LogoGrid from '../components/Common/LogoGrid';
import Services from '../components/Homepage/services';
import Intro from '../components/Homepage/Intro';
import OurWork from '../components/Homepage/OurWork';
import Events from '../components/Homepage/events';
import BlogSection from '../components/Homepage/BlogSection';
import FooterSections from '../components/Homepage/FooterSections';
import BlueBackground from '../components/Common/BlueBackground';
import Contributions from '../components/Common/Contributions';
import { Subtitle } from '../components/Typography';

import { HomePageContext, LogoStyleContext } from '../context/PageContext';

import { colors } from '../utils/theme';

/**
 * Importing fragments here to have them available to the entire
 * GraphQL schema
 */
// eslint-disable-next-line no-unused-vars
import { fragments } from '../fragments';

const dateFormat = 'PPP';

const getFeaturedEventDate = ({ node }) => {
  const { date: rawDate, endTime: rawEndTime } = node;
  const date = parseISO(rawDate);
  const endTime = parseISO(rawEndTime);

  return !isSameDay(date, endTime) && isAfter(endTime, date)
    ? `${format(date, dateFormat)} - ${format(endTime, dateFormat)}`
    : format(date, dateFormat);
};

const getHomepageConferences = (events = []) =>
  events
    .filter((n) => n.node.homepageFeatured)
    .slice(0, 1)
    .map((n) => ({
      ...n.node,
      date: getFeaturedEventDate(n),
    }));

/**
 * Because this is the home page and needs to be a
 * great looking page, a lot of work on diverts
 * from the normal practises that  are used throughout
 * the rest of the site.
 *
 * Specifically the hero section, a lot of this
 * has custom CSS to get it the way that we want it.
 */

const StyledSubtitle = styled(Subtitle)`
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const Column = styled(Col)`
  padding-top: ${(props) => props.theme.space[2]};
`;

const IndexPage = ({ data, location }) => {
  const {
    contentfulHomepage: content,
    allContentfulMeetupEvent: events,
    allContentfulBlogPost: blogData,
  } = data;

  const sortedServices = content.services.sort((a, b) => a.order - b.order);
  const blogPosts = blogData.edges || [];
  const featuredEvent = getHomepageConferences(events.edges)[0];

  const value = React.useMemo(() => {
    return {
      fillColorInitial: colors.white,
      textColor: colors.blueBg,
    };
  }, []);

  return (
    <HomePageContext.Provider>
      <LogoStyleContext.Provider value={value}>
        <Layout location={location} bgColor="blueBg">
          <Head seoMetaData={content.seoMetaData} />
          <Intro {...content} />
          <GreyBackground>
            <Grid>
              <OurWork />
              <Row>
                <Column width={[1]}>
                  <StyledSubtitle>
                    Some of the companies we&apos;ve worked with
                  </StyledSubtitle>
                </Column>
              </Row>
              <LogoGrid companies={content.companies} />
            </Grid>
          </GreyBackground>
          <Grid>
            <Services
              statement={content.serviceStatement}
              services={sortedServices}
            />
          </Grid>
          <GreyBackground>
            <Events
              featuredEvent={featuredEvent}
              eventTypes={content.eventTypes}
            />
          </GreyBackground>
          {blogPosts && blogPosts.length > 0 && (
            <BlogSection blogPosts={blogPosts} />
          )}
          <BlueBackground>
            <Contributions {...content.contributions} />
          </BlueBackground>
          <GreyBackground>
            <FooterSections {...content} />
          </GreyBackground>
        </Layout>
      </LogoStyleContext.Provider>
    </HomePageContext.Provider>
  );
};

export const query = graphql`
  query {
    contentfulHomepage {
      title
      seoTitle
      seoMetaDescription
      seoMetaData {
        ...SEOMetaFields
      }
      introHeader
      introContent {
        introContent
      }
      introCtaText
      introCtaLink
      seoText {
        raw
      }
      serviceStatement
      services {
        id
        title
        slug
        pageReady
        order
        icon {
          file {
            url
          }
          title
          gatsbyImageData(layout: FULL_WIDTH)
        }

        caseStudies {
          ... on Node {
            ... on ContentfulNonTemplatedCaseStudyV2 {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            ... on ContentfulTemplatedCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
        introSentence {
          introSentence
        }
        homePageSpecialities {
          id
          slug
          title
        }
      }
      companies {
        id
        title
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      footerContactUs {
        id
      }
      contributions: contributionsSection {
        githubMetaData {
          contributionsCount
          reposContributedToCount
        }
        ctaCopy
        ctaLink
        descriptionLine1
        descriptionLine2
        titleBeforeContributionCount
        titleBetweenContributionAndProjectCount
        titleAfterProjectCount
        icon {
          title
          file {
            url
          }
        }
        sectionGraphic {
          title
          file {
            url
          }
        }
        descriptionLine1
        descriptionLine2
        ctaCopy
        ctaLink
        githubRepos {
          id
          url
          nameWithOwner
          yldContributionsCount
          starCount
        }
      }
      footerSection1Icon {
        file {
          url
        }
        title
      }
      footerSection1Title
      footerSection1Copy
      footerSection1CtaCopy
      footerSection1CtaLink
      footerSection2Icon {
        file {
          url
        }
        title
      }
      footerSection2Title
      footerSection2Copy
      footerSection2CtaCopy
      footerSection2CtaLink
      eventTypes {
        title
        copy
        image {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
    allContentfulBlogPost(
      filter: { publish: { eq: true } }
      limit: 3
      sort: { firstPublishedAt: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          slug
          headerImage {
            title
            file {
              url
            }
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1)
          }
          content {
            childMdx {
              excerpt
            }
          }
          authorId
          authorName
          subtitle {
            subtitle
          }
        }
      }
    }

    allContentfulMeetupEvent {
      edges {
        node {
          color
          mobilePosterImage {
            title
            file {
              url
            }
            gatsbyImageData(layout: FULL_WIDTH)
          }
          desktopPosterImage {
            title
            file {
              url
            }
            gatsbyImageData(layout: FULL_WIDTH)
          }
          posterImage {
            title
            file {
              url
            }
            gatsbyImageData(layout: FULL_WIDTH)
          }
          homepageFeatured
          id
          eventTitle
          date
          endTime
          ctaText
          linkToEvent
          blurb {
            blurb
          }
        }
      }
    }
  }
`;

export default IndexPage;

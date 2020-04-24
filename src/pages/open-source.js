import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';

import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import Head from '../components/Common/Head';
import Layout from '../components/layout';
import { Grid, Row, Col } from '../components/grid';
import EventSection from '../components/Common/Events';
import BlueBackground from '../components/Common/BlueBackground';
import Statement from '../components/Common/Statement';
import SeoLinksContainer from '../components/Common/seoLinksContainer';
import Hr from '../components/Common/Hr';
import Contributions from '../components/Common/Contributions';

import TalksSection from '../components/OpenSource/Talks';
import PartnershipsSection from '../components/OpenSource/Partnerships';
import WhyOpenSource from '../components/OpenSource/WhyOpenSource';
import OpenDeliverables from '../components/OpenSource/OpenDeliverables';
import { LogoStyleContext } from '../context/PageContext';
import { colors } from '../utils/theme';
import FeaturedWork from '../components/Common/case-studies/FeaturedWork';
import GreyBackground from '../components/Common/GreyBackground';

const StyledHr = styled(Hr)`
  border-color: ${({ theme }) => theme.colors.white};
  opacity: 0.5;
`;

const title = 'Open Source';

const OpenSource = ({ data, location }) => {
  const {
    contentfulOpenSourcePage: {
      seoMetaData,
      statement,
      talksSectionImage,
      talksSectionTitle,
      talksSectionTalks,
      talkSectionCtaText,
      talksSectionCtaLink,
      whyOsSectionTitle,
      whyOsSectionReason1Image,
      whyOsSectionReason1Title,
      whyOsSectionReason1Body,
      whyOsSectionReason2Image,
      whyOsSectionReason2Title,
      whyOsSectionReason2Body,
      whyOsSectionReason3Image,
      whyOsSectionReason3Title,
      whyOsSectionReason3Body,
      whyOsSectionClientsSubtitle,
      whyOsSectionClients,
      technologiesSectionTitle,
      technologiesSectionTechnologies,
      technologyPartnersSectionTitle,
      technologyPartners: partners,
      eventsSectionImage,
      eventsSectionDescription,
      topContributionsSection,
      contributionsSection,
      featuredWork,
      footerContactUs: { id: footerContactId },
    },
    allContentfulMeetupEvent: { nodes: events },
    site: {
      siteMetadata: { siteUrl },
    },
  } = data;

  const talks = talksSectionTalks.filter(({ type }) => type === 'Talk');

  const whyOsReasons = [
    {
      image: whyOsSectionReason1Image,
      title: whyOsSectionReason1Title,
      body: whyOsSectionReason1Body.whyOsSectionReason1Body,
    },
    {
      image: whyOsSectionReason2Image,
      title: whyOsSectionReason2Title,
      body: whyOsSectionReason2Body.whyOsSectionReason2Body,
    },
    {
      image: whyOsSectionReason3Image,
      title: whyOsSectionReason3Title,
      body: whyOsSectionReason3Body.whyOsSectionReason3Body,
    },
  ];

  const specialities = technologiesSectionTechnologies.map(
    ({ name, specialities }) => ({
      title: name,
      items: specialities,
    }),
  );

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: title,
      pathname: location.pathname,
      position: 2,
    },
  ]);

  return (
    <LogoStyleContext.Provider
      value={{
        type: 'squared',
        fillColorInitial: colors.white,
        fillColorHover: '#8e8e8e',
        textColor: colors.blueBg,
      }}
    >
      <Layout
        location={location}
        bgColor="blueBg"
        slug={'open-source'}
        footerContactUsId={footerContactId}
        breadcrumbData={breadcrumbData}
      >
        <Head seoMetaData={seoMetaData} />
        <BlueBackground
          css={css`
            margin-top: -${remcalc(36)};
          `}
        >
          <Contributions {...topContributionsSection} />
        </BlueBackground>
        <Statement as="h1">{statement}</Statement>
        <WhyOpenSource
          title={whyOsSectionTitle}
          list={whyOsReasons}
          subtitle={whyOsSectionClientsSubtitle}
          companies={whyOsSectionClients}
        />
        <OpenDeliverables {...data} />
        <BlueBackground>
          <Contributions {...contributionsSection} />
          <Grid>
            <Row>
              <Col width={[1]}>
                <StyledHr />
              </Col>
            </Row>
          </Grid>
          {talks && talks.length && (
            <TalksSection
              icon={talksSectionImage}
              title={talksSectionTitle}
              talks={talks}
              ctaText={talkSectionCtaText}
              ctaLink={talksSectionCtaLink}
            />
          )}
        </BlueBackground>
        <EventSection
          events={events}
          title={title}
          description={eventsSectionDescription}
          eventIcon={eventsSectionImage.file.url}
        />
        <BlueBackground>
          {partners && partners.length && (
            <PartnershipsSection
              title={technologyPartnersSectionTitle}
              partners={partners}
            />
          )}
        </BlueBackground>

        {specialities && specialities.length && (
          <GreyBackground>
            <SeoLinksContainer
              specialities={specialities}
              sectionTitle={technologiesSectionTitle}
            />
          </GreyBackground>
        )}

        <FeaturedWork limited hideSparseRows caseStudies={featuredWork} />
      </Layout>
    </LogoStyleContext.Provider>
  );
};

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allContentfulMeetupEvent {
          nodes {
            id
            eventTitle
            date
            linkToEvent
          }
        }
        contentfulOpenSourcePage {
          title
          seoDescription
          seoMetaData {
            ...SEOMetaFields
          }
          eventsSectionImage {
            id
            title
            file {
              fileName
              url
            }
          }
          statement
          talksSectionImage {
            title
            file {
              url
            }
          }
          talksSectionTitle
          talksSectionTalks {
            title
            type
            link
          }
          talkSectionCtaText
          talksSectionCtaLink
          whyOsSectionTitle
          whyOsSectionReason1Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason1Title
          whyOsSectionReason1Body {
            whyOsSectionReason1Body
          }
          whyOsSectionReason2Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason2Title
          whyOsSectionReason2Body {
            whyOsSectionReason2Body
          }
          whyOsSectionReason3Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason3Title
          whyOsSectionReason3Body {
            whyOsSectionReason3Body
          }
          whyOsSectionClientsSubtitle
          whyOsSectionClients {
            id
            title
            file {
              url
            }
            fluid(maxWidth: 250) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          technologyPartnersSectionTitle
          technologyPartners {
            name
            logoLightTheme {
              title
              file {
                url
              }
            }
            logoDarkTheme {
              title
              file {
                url
              }
            }
            url
            membershipLevel
            description
          }
          openDeliverablesSectionTitle
          openDeliverablesClientReposSubtitle
          openDeliverablesSectionDescription {
            openDeliverablesSectionDescription
          }
          openDeliverablesClientRepos {
            id
            url
            nameWithOwner
            pullRequestCount
            starCount
            clientLogo {
              file {
                url
                fileName
                contentType
              }
            }
          }
          topContributionsSection {
            titleBeforeContributionCount
            titleBetweenContributionAndProjectCount
            titleAfterProjectCount
            githubMetaData {
              openSourceMetaPullRequestsCount
              openSourceMetaReposCount
            }
            sectionGraphic {
              title
              file {
                url
              }
            }
          }
          contributionsSection {
            titleStandalone
            icon {
              title
              file {
                url
              }
            }
            ctaCopy
            ctaLink
            githubRepos {
              id
              url
              nameWithOwner
              pullRequestCount
              starCount
            }
          }
          eventsSectionDescription
          technologiesSectionTitle
          technologiesSectionTechnologies {
            referenceName
            name
            specialities {
              title
              id
            }
          }
          featuredWork {
            ... on Node {
              ...NonTemplatedCaseStudyV2
              ...TemplatedCaseStudy
            }
          }
          footerContactUs {
            id
          }
        }
      }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
);

export default OpenSourcePage;

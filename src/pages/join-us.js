import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import scrollToComponent from 'react-scroll-to-component';

import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import Layout from '../components/layout';
import ViewPositions from '../components/JoinUs/ViewOpenPositions';
import Learning from '../components/JoinUs/Learning';
import Work from '../components/JoinUs/Work';
import OSS from '../components/JoinUs/OpenSource';
import Perks from '../components/JoinUs/Perks';
import { OpenPositionsWithRef } from '../components/Common/OpenPositions';
import Head from '../components/Common/Head';

class JoinUs extends React.Component {
  constructor(props) {
    super(props);
    this.vacanciesRef = React.createRef();
  }

  scrollToVacancies = () =>
    scrollToComponent(this.vacanciesRef.current, {
      offset: -84,
      align: 'top',
      duration: 800,
    });

  render() {
    const {
      data: {
        contentfulJoinUsPage: content,
        site: {
          siteMetadata: { siteUrl },
        },
      },
      location,
    } = this.props;

    const breadcrumbData = generateBreadcrumbData(siteUrl, [
      {
        name: 'Join us',
        pathname: location.pathname,
        position: 2,
      },
    ]);

    return (
      <Layout
        footerContactUsId={content.footerContactUs.id}
        breadcrumbData={breadcrumbData}
        slug={content.title}
      >
        <Head seoMetaData={content.seoMetaData} />
        <ViewPositions
          text={content.introductionText.introductionText}
          description={content.introductionDescription.introductionDescription}
          scrollToVacancies={this.scrollToVacancies}
        />
        <Learning
          data={{
            title: content.learningTitle,
            list: content.learningText.learningText,
            subtitle: content.insightsTitle,
            text: content.insightsDescriptionText.insightsDescriptionText,
            featuredInsights: content.insights,
          }}
        />
        <Work
          data={{
            title: content.challengingTitle,
            list: content.challengingText.challengingText,
            subtitle: content.someOfOurWorkTitle,
            text: content.someOfOurWorkDescription.someOfOurWorkDescription,
            someWork: content.someWork,
          }}
        />
        <OSS
          data={{
            title: content.ossTitle,
            list: content.ossText.ossText,
            subtitle: content.talksTitle,
            text: content.talksText.talksText,
            featuredTalks: content.talks,
          }}
        />
        <Perks
          data={{
            title: content.perksTitle,
            text: content.perksText.perksText,
            perks: content.perks,
          }}
        />
        <OpenPositionsWithRef
          data={{
            title: content.openPositionsTitle,
          }}
          ref={this.vacanciesRef}
          limit={40}
        />
      </Layout>
    );
  }
}

const JoinUsPage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        contentfulJoinUsPage {
          title
          seoTitle
          seoDescription
          seoMetaData {
            ...SEOMetaFields
          }
          introductionText {
            introductionText
          }
          introductionDescription {
            introductionDescription
          }
          learningTitle
          learningText {
            learningText
          }
          insightsTitle
          insightsDescriptionText {
            insightsDescriptionText
          }
          insights {
            name
            title
            url
            image {
              title
              file {
                url
              }
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
          challengingTitle
          challengingText {
            challengingText
          }
          someOfOurWorkTitle
          someOfOurWorkDescription {
            someOfOurWorkDescription
          }
          someWork {
            ... on ContentfulTemplatedCaseStudy {
              title
              slug
              posterColor
            }
            ... on ContentfulNonTemplatedCaseStudyV2 {
              title
              slug
              posterColor
            }
          }
          ossTitle
          ossText {
            ossText
          }
          talksTitle
          talksText {
            talksText
          }
          talks {
            title
            link
          }
          perksTitle
          perksText {
            perksText
          }
          perks {
            description {
              description
            }
            icon {
              file {
                url
                fileName
                contentType
              }
            }
          }
          openPositionsTitle
          directApplicationTitle
          directApplicationText {
            directApplicationText
          }
          footerContactUs {
            id
          }
        }
      }
    `}
    render={data => <JoinUs data={data} {...props} />}
  />
);

export default JoinUsPage;

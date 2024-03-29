import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Formats from '../components/Training/Formats';
import Courses from '../components/Training/Courses';
import FeaturedWork from '../components/Common/case-studies/FeaturedWork';
import Head from '../components/Common/Head';
import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import IntroSection from '../components/Service/IntroSection';

const TrainingPage = ({
  data: {
    contentfulTrainingPage: content,
    contentfulService: service,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => {
  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Training',
      pathname: location.pathname,
      position: 2,
    },
  ]);

  const introBlocks = [
    {
      subtitle: service.introBlock1Title,
      body: service.introBlock1Content,
      icon: service.introBlock1Icon,
    },
    {
      subtitle: service.introBlock2Title,
      body: service.introBlock2Content,
      icon: service.introBlock2Icon,
    },
    {
      subtitle: service.introBlock3Title,
      body: service.introBlock3Content,
      icon: service.introBlock3Icon,
    },
  ];

  return (
    <Layout
      slug="training"
      footerContactUsId={content.footerContactUs.id}
      breadcrumbData={breadcrumbData}
    >
      <Head seoMetaData={content.seoMetaData} />
      <IntroSection
        introSentence={service.mainPageIntroSentence.mainPageIntroSentence}
        introBlocks={introBlocks}
      />
      <Formats formats={content.trainingFormats} />{' '}
      <Courses
        categories={content.courseCategories}
        sectionTitle={content.courseSectionTitle}
      />
      <FeaturedWork
        limited
        hideSparseRows
        caseStudies={content.relatedCaseStudies}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulTrainingPage {
      seoMetaData {
        ...SEOMetaFields
      }
      contactUsText {
        contactUsText
      }
      contactUsTitle
      trainingApproachTitle
      trainingApproachContent1 {
        trainingApproachContent1
      }
      trainingApproachContent2 {
        trainingApproachContent2
      }
      trainingApproachContent3 {
        trainingApproachContent3
      }
      courseSectionTitle
      courseCategories {
        id
        slug
        name
        logo {
          gatsbyImageData(layout: FULL_WIDTH)
          title
          file {
            url
          }
        }
        courses {
          id
          slug
          name
        }
      }
      trainingFormats {
        id
        title
        description
        bulletPoints
        icon {
          title
          file {
            url
          }
        }
      }
      relatedCaseStudies {
        ... on Node {
          ... on ContentfulTemplatedCaseStudy {
            title
            slug
            introSentence {
              introSentence
            }
            client
            reverseColor
            posterColor
            previewImage {
              title
              gatsbyImageData(layout: FULL_WIDTH)
              file {
                url
              }
            }
          }
          ... on ContentfulNonTemplatedCaseStudyV2 {
            title
            slug
            introSentence {
              introSentence
            }
            client
            reverseColor
            posterColor
            previewImage {
              title
              gatsbyImageData(layout: FULL_WIDTH)
              file {
                url
              }
            }
          }
        }
      }
      footerContactUs {
        id
      }
    }
    contentfulService(slug: { eq: "training" }) {
      mainPageIntroSentence {
        mainPageIntroSentence
      }
      introBlock1Title
      introBlock1Content
      introBlock1Icon {
        file {
          url
        }
      }
      introBlock2Title
      introBlock2Content
      introBlock2Icon {
        file {
          url
        }
      }
      introBlock3Title
      introBlock3Content
      introBlock3Icon {
        file {
          url
        }
      }
    }
  }
`;

export default TrainingPage;

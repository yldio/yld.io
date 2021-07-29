import React from 'react';
import capitalize from 'capitalize';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Head from '../components/Common/Head';
import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import getServiceInfo from '../utils/getServiceInfo';

import { SpecialityView } from './speciality-component';
import { LogoStyleContext } from '../context/PageContext';
import { colors } from '../utils/theme';

const Speciality = ({ data, location }) => {
  const {
    contentfulSpeciality: speciality,
    services,
    specialities,
    site: {
      siteMetadata: { siteUrl },
    },
  } = data;
  const { slug, title, seoMetaData } = speciality;

  const { service, specialityColor } = getServiceInfo({
    slug,
    services,
    specialities,
  });

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      position: 2,
      name: capitalize(service),
      pathname: `/${service}/`,
    },
    {
      name: title,
      position: 3,
      pathname: location.pathname,
    },
  ]);

  const value = React.useMemo(() => {
    return {
      fillColorInitial: specialityColor,
      fillColorHover: colors.white,
      textColor: colors.blueBg,
      serviceColor: colors.white,
    };
  }, [specialityColor]);

  return (
    <LogoStyleContext.Provider value={value}>
      <Layout
        bgColor="blueBg"
        slug={slug}
        title={title}
        location={location}
        footerContactUsId={
          speciality.footerContactUs && speciality.footerContactUs.id
        }
        breadcrumbData={breadcrumbData}
      >
        <Head seoMetaData={seoMetaData} />
        <SpecialityView data={data} />
      </Layout>
    </LogoStyleContext.Provider>
  );
};

export default Speciality;

export const pageQuery = graphql`
  query ($id: String, $postsTags: [String], $postsLimit: Int) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    services: allContentfulService {
      nodes {
        slug
        specialityAreaItems1 {
          id
          slug
          title
        }
        specialityAreaItems2 {
          id
          slug
          title
        }
        specialityAreaItems3 {
          id
          slug
          title
        }
        specialityAreaItems4 {
          id
          slug
          title
        }
      }
    }
    specialities: allContentfulSpeciality {
      nodes {
        slug
        logoColour
      }
    }
    contentfulSpeciality(id: { eq: $id }) {
      slug
      title
      seoMetaData {
        ...SEOMetaFields
      }
      seoText {
        raw
      }
      introGraphic {
        id
        gatsbyImageData(layout: FULL_WIDTH)
        title
        file {
          url
        }
      }
      introTitle
      introTextTitle1
      introTextBody1 {
        raw
      }
      introTextTitle2
      introTextBody2 {
        raw
      }
      introTextTitle3
      introTextBody3 {
        raw
      }
      relatedProjects {
        ... on ContentfulTemplatedCaseStudy {
          title
          slug
          introSentence {
            introSentence
          }
          posterColor
          posterImage {
            gatsbyImageData(layout: FULL_WIDTH)
            title
            file {
              url
            }
          }
        }
        ... on ContentfulNonTemplatedCaseStudyV2 {
          title
          slug
          posterColor
          introSentence {
            introSentence
          }
          posterImage {
            gatsbyImageData(layout: FULL_WIDTH)
            title
            file {
              url
            }
          }
          alternativePreviewImage {
            gatsbyImageData(layout: FULL_WIDTH)
            title
            file {
              url
            }
          }
        }
      }
      clients {
        id
        title
        file {
          url
          fileName
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      trainingIntroText {
        raw
      }
      trainingTextIcon1 {
        id
        title
        gatsbyImageData(layout: FULL_WIDTH)
        file {
          url
          fileName
        }
      }
      trainingTextTitle1
      trainingTextBody1 {
        raw
      }
      trainingTextIcon2 {
        id
        title
        gatsbyImageData(layout: FULL_WIDTH)
        file {
          url
          fileName
        }
      }
      trainingTextTitle2
      trainingTextBody2 {
        raw
      }
      trainingTextIcon3 {
        id
        title
        gatsbyImageData(layout: FULL_WIDTH)
        file {
          url
          fileName
        }
      }
      trainingTextTitle3
      trainingTextBody3 {
        raw
      }
      externalResources {
        type
        title
        link
        cta
        featured
        additionalInfo
        id
        colorCode
      }
      communityText {
        raw
      }
      communityLogo {
        id
        title
        gatsbyImageData(layout: FULL_WIDTH)
        file {
          fileName
          url
        }
      }
      communityBackground {
        id
        title
        gatsbyImageData(layout: FULL_WIDTH)
        file {
          fileName
          url
        }
      }
      howWeWorkWithTitle
      howWeWorkWithCopy {
        howWeWorkWithCopy
      }
      # howWeWorkWithPractises {
      #   # content {
      #   #   content
      #   # }
      # }
      eventsBackgroundColor
      eventIcon {
        id
        title
        file {
          fileName
          url
        }
      }
      blogBackgroundColor
      logoColour
      contactText
      footerContactUs {
        id
      }
    }

    allContentfulMeetupEvent(
      filter: { specialities: { elemMatch: { id: { in: [$id] } } } }
    ) {
      nodes {
        id
        eventTitle
        date
        linkToEvent
      }
    }

    videoIcon: contentfulAsset(
      id: { eq: "395d5bbc-442f-57c2-81d8-90c04fe428e6" }
    ) {
      id
      title
      file {
        fileName
        url
      }
    }

    filteredPosts: allContentfulBlogPost(
      filter: { publish: { eq: true }, tags: { in: $postsTags } }
      limit: $postsLimit
      sort: { fields: [firstPublishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          tags
          slug
        }
      }
    }
  }
`;

import React from 'react';
import capitalize from 'capitalize';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Head from '../components/Common/Head';
import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import getServiceInfo from '../utils/getServiceInfo';

import { SpecialityView } from './speciality-component';

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

  const { service } = getServiceInfo({
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

  return (
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
  );
};

export default Speciality;

export const pageQuery = graphql`
  query($id: String, $postsTags: [String], $postsLimit: Int) {
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
      seoTitle
      seoMetaDescription
      seoMetaData {
        ...SEOMetaFields
      }
      seoText {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      introGraphic {
        id
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
          url
        }
      }
      introTitle
      introTextTitle1
      introTextBody1 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      introTextTitle2
      introTextBody2 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      introTextTitle3
      introTextBody3 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
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
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
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
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
            title
            file {
              url
            }
          }
          alternativePreviewImage {
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
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
        fluid(maxWidth: 250) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      trainingIntroText {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      trainingTextIcon1 {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
          fileName
        }
      }
      trainingTextTitle1
      trainingTextBody1 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      trainingTextIcon2 {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
          fileName
        }
      }
      trainingTextTitle2
      trainingTextBody2 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      trainingTextIcon3 {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
          fileName
        }
      }
      trainingTextTitle3
      trainingTextBody3 {
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
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
        nodeType
        content {
          nodeType
          content {
            nodeType
            value
          }
        }
      }
      communityLogo {
        id
        title
        fluid(maxHeight: 250) {
          ...GatsbyContentfulFluid
        }
        file {
          fileName
          url
        }
      }
      communityBackground {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          fileName
          url
        }
      }
      howWeWorkWithTitle
      howWeWorkWithCopy {
        howWeWorkWithCopy
      }
      howWeWorkWithPractises {
        content {
          content
        }
      }
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
      limit: $postsLimit
      sort: { fields: [firstPublishedAt], order: DESC }
      filter: { tags: { in: $postsTags } }
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

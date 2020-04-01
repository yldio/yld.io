import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment GenericFragment on ContentfulNonTemplatedCaseStudyGenericBlock {
    genericBlockImages {
      title
      fluid(maxWidth: 1100) {
        ...GatsbyContentfulFluid
      }
    }
    genericBlockText {
      genericBlockText
    }
  }

  fragment NonTemplatedCaseStudyV2 on ContentfulNonTemplatedCaseStudyV2 {
    title
    slug
    previewImage {
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
      title
      file {
        url
      }
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
    posterColor
    reverseColor
    introSentence {
      introSentence
    }
    client
  }

  fragment TemplatedCaseStudy on ContentfulTemplatedCaseStudy {
    title
    slug
    previewImage {
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
      title
      file {
        url
      }
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
    posterColor
    reverseColor
    introSentence {
      introSentence
    }
    client
  }

  fragment NonTemplatedCaseStudyV2Related on ContentfulNonTemplatedCaseStudyV2 {
    relatedCaseStudies {
      ... on Node {
        ...NonTemplatedCaseStudyV2
        ...TemplatedCaseStudy
      }
    }
  }

  fragment TemplatedCaseStudyRelated on ContentfulTemplatedCaseStudy {
    relatedCaseStudies {
      ... on Node {
        ...NonTemplatedCaseStudyV2
        ...TemplatedCaseStudy
      }
    }
  }

  fragment SEOMetaFields on ContentfulSeoMetaContent {
    title
    description
    keywords
    socialLogo {
      file {
        url
      }
    }
  }
`;

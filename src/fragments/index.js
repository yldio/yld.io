import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment GenericFragment on ContentfulNonTemplatedCaseStudyGenericBlock {
    genericBlockImages {
      title
      gatsbyImageData(layout: FULL_WIDTH)
    }
    genericBlockText {
      genericBlockText
    }
  }

  fragment NonTemplatedCaseStudyV2 on ContentfulNonTemplatedCaseStudyV2 {
    title
    slug
    previewImage {
      gatsbyImageData(layout: FULL_WIDTH)
      title
      file {
        url
      }
    }
    posterImage {
      gatsbyImageData(layout: FULL_WIDTH)
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
      gatsbyImageData(layout: FULL_WIDTH)

      title
      file {
        url
      }
    }
    posterImage {
      gatsbyImageData(layout: FULL_WIDTH)
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

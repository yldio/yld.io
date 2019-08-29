import { graphql } from 'gatsby'

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
    introSentence {
      introSentence
    }
  }

  fragment NonTemplatedCaseStudy on ContentfulNonTemplatedCaseStudy {
    title
    slug
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
    introSentence {
      introSentence
    }
  }

  fragment TemplatedCaseStudy on ContentfulTemplatedCaseStudy {
    title
    slug
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
    introSentence {
      introSentence
    }
  }

  fragment NonTemplatedCaseStudyV2Related on ContentfulNonTemplatedCaseStudyV2 {
    relatedCaseStudies {
      ... on Node {
        ...NonTemplatedCaseStudyV2
        ...NonTemplatedCaseStudy
        ...TemplatedCaseStudy
      }
    }
  }

  fragment NonTemplatedCaseStudyRelated on ContentfulNonTemplatedCaseStudy {
    relatedCaseStudies {
      ... on Node {
        ...NonTemplatedCaseStudyV2
        ...NonTemplatedCaseStudy
        ...TemplatedCaseStudy
      }
    }
  }

  fragment TemplatedCaseStudyRelated on ContentfulTemplatedCaseStudy {
    relatedCaseStudies {
      ... on Node {
        ...NonTemplatedCaseStudyV2
        ...NonTemplatedCaseStudy
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
`

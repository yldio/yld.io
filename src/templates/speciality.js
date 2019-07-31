import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/Common/Head'

import { SpecialityView } from './speciality-component'

const Speciality = ({ data, location }) => {
  const { contentfulSpeciality: speciality } = data

  return (
    <Layout backgroundColor="blue" location={location}>
      <Head page={speciality} />
      <SpecialityView data={data} />
    </Layout>
  )
}

export default Speciality

export const pageQuery = graphql`
  query($id: String, $postsTags: [String], $postsLimit: Int) {
    contentfulSpeciality(id: { eq: $id }) {
      slug
      title
      seoTitle
      seoMetaDescription
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
            title
            file {
              url
            }
          }
        }
        ... on ContentfulNonTemplatedCaseStudy {
          title
          slug
          posterColor
          introSentence {
            introSentence
          }
          posterImage {
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
      eventIcon {
        id
        title
        file {
          fileName
          url
        }
      }
      contactText
    }

    allContentfulMeetupEvent {
      edges {
        node {
          id
          eventTitle
          date
          linkToEvent
        }
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

    filteredPosts: allMediumPost(
      limit: $postsLimit
      sort: { fields: [firstPublishedAt], order: DESC }
      filter: {
        virtuals: { tags: { elemMatch: { slug: { in: $postsTags } } } }
      }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          virtuals {
            tags {
              slug
            }
          }
          uniqueSlug
        }
      }
    }
  }
`

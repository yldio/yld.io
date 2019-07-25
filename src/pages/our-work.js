import React, { Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import Layout from '../components/layout'
import GreyBackground from '../components/Common/GreyBackground'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, DisplayTitle } from '../components/Typography'
import Hr from '../components/Common/Hr'
import Head from '../components/Common/Head'
import CaseStudy from '../components/OurWork/CaseStudy'

// 'Thomas-Cook` slug is uppercased in Contentful
const caseStudiesOrder = [
  'doctorlink',
  'central-working',
  'learnerbly',
  'trainline',
  'the-economist',
  'kingfisher',
  'Thomas-Cook',
  'joyent',
  'canon'
]

const getCSOrderIndex = slug =>
  caseStudiesOrder.indexOf(caseStudiesOrder.find(cs => slug.includes(cs)))

const formatCaseStudies = caseStudies =>
  caseStudies.edges.map(caseStudyObject => {
    const caseStudy = caseStudyObject.node
    return {
      ...caseStudy,
      services: caseStudy.services
        .filter(service => service.title)
        .map(service => service.title)
    }
  })

const ourWork = {
  title: 'Our Work',
  description:
    "We make work that we’re proud to stand behind and celebrate. That way we’re sure our clients love it from the moment we start collaborating to well after we've left",
  seoTitle: 'A collection of case studies'
}

const IntroTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const IntroDescriptionCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const OurWork = ({ data }) => {
  const {
    allContentfulNonTemplatedCaseStudyV2,
    allContentfulTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudy,
    contentfulOurWork: { caseStudies }
  } = data

  const ids = caseStudies
    .filter(({ publish }) => publish)
    .map(({ id, title }) => ({ id, title }))

  console.log({ ids })

  const allCaseStudies = [
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudyV2),
    ...formatCaseStudies(allContentfulTemplatedCaseStudy),
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudy)
  ].sort((a, b) =>
    getCSOrderIndex(a.slug) <= getCSOrderIndex(b.slug) ? -1 : 1
  )

  const page = allContentfulTemplatedCaseStudy.edges[0].node

  return (
    <Layout>
      <Head
        page={{
          ...page,
          title: ourWork.title,
          seoTitle: ourWork.seoTitle,
          seoMetaDescription: ourWork.description
        }}
      />
      <Grid>
        <Row>
          <IntroTitleCol width={[1]}>
            <SectionTitle as="h1">{ourWork.title}</SectionTitle>
          </IntroTitleCol>
          <IntroDescriptionCol width={[1, 1, 1, 1, 9 / 12]}>
            <DisplayTitle regular textLight>
              {ourWork.description}
            </DisplayTitle>
          </IntroDescriptionCol>
        </Row>
      </Grid>
      <GreyBackground>
        <Grid>
          {allCaseStudies.map((caseStudy, index, arr) => {
            const isFirstCaseStudy = index === 0
            const isLastCaseStudy = index === arr.length - 1
            const isMiddleCaseStudy = !!(!isFirstCaseStudy && !isLastCaseStudy)
            return (
              <Fragment key={index}>
                {isFirstCaseStudy && (
                  <Fragment>
                    <Padding
                      top={{ smallPhone: 3, smallTablet: 3.5, tablet: 4 }}
                      bottom={{ smallPhone: 2, smallTablet: 3 }}
                    >
                      <CaseStudy caseStudy={caseStudy} />
                    </Padding>
                    <Hr />
                  </Fragment>
                )}
                {isMiddleCaseStudy && (
                  <Fragment>
                    <Padding top={3} bottom={{ smallPhone: 2, smallTablet: 3 }}>
                      <CaseStudy caseStudy={caseStudy} />
                    </Padding>
                    <Hr />
                  </Fragment>
                )}
                {isLastCaseStudy && (
                  <Padding
                    top={3}
                    bottom={{ smallPhone: 3.5, smallTablet: 3.5, tablet: 4 }}
                  >
                    <CaseStudy caseStudy={caseStudy} />
                  </Padding>
                )}
              </Fragment>
            )
          })}
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

const OurWorkPage = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulOurWork {
          caseStudies {
            ... on ContentfulNonTemplatedCaseStudy {
              id
              publish
            }
            ... on ContentfulNonTemplatedCaseStudyV2 {
              id
              publish
            }
            ... on ContentfulTemplatedCaseStudy {
              id
              publish
            }
          }
        }

        allContentfulNonTemplatedCaseStudyV2(
          filter: { publish: { eq: true } }
        ) {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              posterColor
            }
          }
        }
        allContentfulNonTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <OurWork data={data} {...props} />}
  />
)

export default OurWorkPage

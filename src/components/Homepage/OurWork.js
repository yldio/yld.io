import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Row, Col } from '../grid'
import { SectionTitle, CardTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'

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

const TitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const MobileOnlyRow = styled(Row)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const TabletOnlyRow = styled(Row)`
  display: none;
  ${breakpoint('smallTablet')`
    display: flex;
  `}

  ${breakpoint('desktop')`
    display: none;
  `}
`

const DesktopOnlyRow = styled(Row)`
  display: none;
  ${breakpoint('desktop')`
    display: flex;
  `}
`

const CardHeader = styled.header`
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[2]}`};
  max-width: ${remcalc(475)};
  box-sizing: border-box;
  background-color: #${({ backgroundColor }) => backgroundColor};

  > div {
    max-width: ${remcalc(310)};
  }

  ${breakpoint('tablet')`
    padding: ${({ theme }) => theme.spacing[2]};
  `}

  ${breakpoint('desktop')`
    padding: ${remcalc(24)} ${remcalc(25)} ${remcalc(31)} ${remcalc(24)};
  `}
`

const Card = styled(RatioContainer)`
  background-color: #${props => props.color};
  background-image: url(${props => props.image.file.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  margin-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    margin-top: ${({ theme }) => theme.space[5]};
  `}
`

const CaseStudy = ({ caseStudy }) => {
  const {
    title,
    client,
    alternativePreviewImage,
    slug,
    posterColor,
    reverseColor
  } = caseStudy

  return (
    <Link to={`/case-study/${slug}`} title={title}>
      <Card
        width={100}
        height={130}
        color={posterColor}
        image={alternativePreviewImage}
      >
        <CardHeader backgroundColor={posterColor}>
          <section>
            <BodyPrimary reverse={reverseColor} muted>
              {client}
            </BodyPrimary>
            <CardTitle reverse={reverseColor} noPadding>
              {title}
            </CardTitle>
          </section>
        </CardHeader>
      </Card>
    </Link>
  )
}

const MoreWorkLink = styled(StyledLink)`
  font-size: ${remcalc(18)};
  line-height: ${remcalc(30)};
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
  margin-top: ${remcalc(10)};
  margin-bottom: ${remcalc(24)};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const OurWork = ({ data }) => {
  const {
    allContentfulNonTemplatedCaseStudyV2,
    allContentfulTemplatedCaseStudy,
    allContentfulNonTemplatedCaseStudy,
    contentfulOurWork: { caseStudies }
  } = data

  const allCaseStudies = [
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudyV2),
    ...formatCaseStudies(allContentfulTemplatedCaseStudy),
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudy)
  ]

  // remove thomas cook and unpublished case studies
  const displayOrderByIDs = caseStudies
    .filter(
      ({ publish, id }) =>
        publish && id !== 'bb2bc84d-c03e-5605-b2fa-041a674a1e94'
    )
    .map(({ id }) => id)

  const mappedFromContentfulOrder = displayOrderByIDs.map(orderedId =>
    allCaseStudies.find(cs => cs.id === orderedId)
  )
  const missingFromContentfulOrder = allCaseStudies.filter(
    cs => !displayOrderByIDs.includes(cs.id)
  )
  const orderedCaseStudies = [
    ...mappedFromContentfulOrder,
    ...missingFromContentfulOrder
  ]

  const mobileCaseStudies = orderedCaseStudies.slice(0, 3)
  const tabletCaseStudies = orderedCaseStudies.slice(0, 4)
  const desktopCaseStudies = orderedCaseStudies.slice(0, 6)

  return (
    <>
      <Row>
        <TitleCol width={1}>
          <SectionTitle as="h1">Our Work</SectionTitle>
        </TitleCol>
      </Row>
      <MobileOnlyRow>
        {mobileCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={1}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </MobileOnlyRow>
      <TabletOnlyRow>
        {tabletCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={1 / 2}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </TabletOnlyRow>
      <DesktopOnlyRow>
        {desktopCaseStudies.map((caseStudy, index) => (
          <Col key={index} width={4 / 12}>
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          </Col>
        ))}
      </DesktopOnlyRow>
      <Row>
        <Col width={1}>
          <MoreWorkLink vibrant to="/our-work">
            More of our work
          </MoreWorkLink>
        </Col>
      </Row>
    </>
  )
}

const OurWorkSection = props => (
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
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              alternativePreviewImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              posterColor
              reverseColor
            }
          }
        }
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              alternativePreviewImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              posterColor
              reverseColor
            }
          }
        }
        allContentfulNonTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              alternativePreviewImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              posterColor
              reverseColor
            }
          }
        }
      }
    `}
    render={data => <OurWork data={data} {...props} />}
  />
)

export default OurWorkSection

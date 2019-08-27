import React from 'react'
import { graphql, navigate } from 'gatsby'
import generate from 'shortid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Get from 'lodash.get'

import Layout from '../components/layout'
import GetInTouch from '../components/Common/GetInTouch'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import { Discipline } from '../components/CareerFramework'
import Tab, { Tabs } from '../components/Common/Tab'
import GreyBackground from '../components/Common/GreyBackground'
import Head from '../components/Common/Head'

const StyledIntroHeaderCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const StyledIntroIntroCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const DisciplineTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const CareerFramework = ({
  data: {
    contentfulCareerFramework: generic,
    contentfulCareerDiscipline: discipline
  },
  pageContext: { slug: pageSlug }
}) => {
  const { introContent, introHeader, disciplines = [] } = generic

  const introContentSafe = Get(
    introContent,
    'content[0].content[0].value',
    undefined
  )

  const disciplineTabData =
    disciplines &&
    disciplines.length &&
    disciplines.reduce(
      (acc, { slug, title }) =>
        acc.concat([
          {
            slug: `/career-framework/${slug}`,
            title,
            isActive: slug === pageSlug
          }
        ]),
      []
    )

  return (
    <Layout>
      <Head page={generic} />
      <Grid>
        <Row>
          <StyledIntroHeaderCol width={[1, 1, 1, 1, 7 / 12, 7 / 12, 5 / 12]}>
            <SectionTitle as="h1">{introHeader}</SectionTitle>
          </StyledIntroHeaderCol>
        </Row>
        <Row>
          <StyledIntroIntroCol width={[1, 1, 1, 1, 6 / 12]}>
            {introContentSafe && <BodyPrimary>{introContentSafe}</BodyPrimary>}
          </StyledIntroIntroCol>
        </Row>
      </Grid>
      <GreyBackground>
        <Grid>
          <Row>
            <DisciplineTitleCol
              width={[1]}
              role="tablist"
              aria-label="discipline tabs"
            >
              <Tabs>
                {disciplineTabData &&
                  disciplineTabData.map(({ slug, title, isActive }) => (
                    <Tab
                      key={title}
                      role="tab"
                      id={`discipline-tab-${slug}`}
                      active={isActive}
                      aria-selected={isActive}
                      aria-controls={`panel-${title}`}
                      onClick={() => navigate(slug)}
                    >
                      {title}
                    </Tab>
                  ))}
              </Tabs>
            </DisciplineTitleCol>
          </Row>
          <Row />
        </Grid>
      </GreyBackground>

      <Discipline key={generate()} {...discipline} />

      <GetInTouch
        title="Want to build your career with us?"
        contactText="With the focus on learning and growth dynamic work environment, devotion to open source communities and epic perks, we hope for talent to feel as home with us."
        ctaText="Get in touch"
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulCareerFramework {
      seoTitle
      seoMetaDescription
      introContent {
        content {
          content {
            value
          }
        }
      }
      introHeader
      disciplines {
        slug
        title
      }
    }
    contentfulCareerDiscipline(id: { eq: $id }) {
      id
      title
      slug
      title
      joins {
        title
        ctaTitle
        ctaUrl
        image {
          fluid(maxWidth: 550) {
            ...GatsbyContentfulFluid
          }
        }
        ctaReference {
          slug
        }
        content {
          content
        }
      }
      groups {
        title
        levels {
          title
          info
          levelInfo {
            title
            infoContent {
              infoContent
            }
            ctaTitle
            ctaUrl
          }
        }
      }
    }
  }
`

export default CareerFramework

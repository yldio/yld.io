import React, { useState } from 'react'
import { graphql } from 'gatsby'
import generate from 'shortid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Get from 'lodash.get'

import Layout from '../components/layout'
import GetInTouch from '../components/Common/GetInTouch'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import { Discipline } from '../components/CareerFramework'
import FakeLink from '../components/Common/StyledLink'
import GreyBackground from '../components/Common/GreyBackground'
import Head from '../components/Common/Head'

const DisciplineTitle = styled(FakeLink)`
  margin-right: ${({ theme }) => theme.space[4]};
  cursor: pointer;
`

const StyledIntroHeaderCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
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

const CareerFramework = ({ data: { contentfulCareerFramework: content } }) => {
  const { introContent, introHeader, disciplines } = content

  const introContentSafe = Get(
    introContent,
    'content[0].content[0].value',
    undefined
  )

  const disciplineTitles =
    disciplines && disciplines.length && disciplines.map(({ title }) => title)

  const [currentDiscipline, toggleDiscipline] = useState(disciplineTitles[0])

  return (
    <Layout>
      <Head page={content} />
      <Grid>
        <Row>
          <StyledIntroHeaderCol width={[1, 1, 1, 1, 5 / 12]}>
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
              {disciplineTitles &&
                disciplineTitles.map((title, idx) => (
                  <DisciplineTitle
                    role="tab"
                    aria-selected={currentDiscipline === title}
                    aria-controls={`panel-${title}`}
                    id={`discipline-tab-${idx}`}
                    key={title}
                    muted={currentDiscipline !== title}
                    onClick={() => toggleDiscipline(title)}
                  >
                    {title}
                  </DisciplineTitle>
                ))}
            </DisciplineTitleCol>
          </Row>
          <Row />
        </Grid>
      </GreyBackground>
      {disciplines &&
        disciplines.length &&
        disciplines.map(discipline => (
          <Discipline
            isActive={currentDiscipline === discipline.title}
            key={generate()}
            {...discipline}
          />
        ))}
      <GetInTouch
        title="Want to build your career with us?"
        contactText="With the focus on learning and growth dynamic work environment, devotion to open source communities and epic perks, we hope for talent to feel as home with us."
        ctaText="Get in touch"
      />
    </Layout>
  )
}

export const query = graphql`
  {
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
        title
        joins {
          title
          ctaTitle
          ctaUrl
          image {
            fluid(maxWidth: 450) {
              ...GatsbyContentfulFluid
            }
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
  }
`

export default CareerFramework

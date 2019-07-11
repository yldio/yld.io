import React, { useState } from 'react'
import { graphql } from 'gatsby'
import generate from 'shortid'
import styled from 'styled-components'
import Get from 'lodash.get'

import Layout from '../components/layout'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import { Discipline } from '../components/CareerFramework'
import FakeLink from '../components/Common/StyledLink'
import GreyBackground from '../components/Common/GreyBackground'
// import Head from '../components/Common/Head'

const DisciplineTitle = styled(FakeLink)`
  margin-right: ${({ theme }) => theme.space[4]};

  ${({ active }) => {
    return active
      ? `
    colour: ${({ theme }) => theme.colors.textLight}
  `
      : ''
  }}
`

const StyledIntroHeaderCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[7]};
`

const StyledIntroIntroCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const DisciplineTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const DisciplineCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
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
      {/* <Head /> */}
      <Grid>
        <Row>
          <StyledIntroHeaderCol width={[1, 1, 1, 1, 5 / 12]}>
            <SectionTitle>{introHeader}</SectionTitle>
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
                    active={currentDiscipline === title}
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
      {/* <DisciplineCol width={[1]}> */}
      {disciplines &&
        disciplines.length &&
        disciplines.map(d => (
          <Discipline
            isActive={currentDiscipline === d.title}
            key={generate()}
            {...d}
          />
        ))}
      {/* </DisciplineCol> */}
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulCareerFramework {
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
              info {
                content {
                  content {
                    value
                  }
                }
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

import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, CardTitle, Subtitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import { AnimatedLink, CardHeader, PosterImage } from '../Common/animatedLink'
import LogoGrid from '../Common/LogoGrid'

const Emphasis = styled.em`
  color: ${props => props.theme.colors.secondaryText};
`

const PosterLinks = ({ project }) => (
  <AnimatedLink to={`/case-study/${project.slug}`} title={project.title}>
    <section
      style={{
        background: `#${project.posterColor}`
      }}
    >
      <CardHeader>
        <CardTitle reverse noPadding bigger>
          {project.title}
        </CardTitle>
        <BodyPrimary reverse muted>
          {project.introSentence}
        </BodyPrimary>
      </CardHeader>
      <PosterImage justifyCenter alignCenter color={project.posterColor}>
        <img
          alt={project.posterImage.title}
          src={project.posterImage.file.url}
          style={{ maxHeight: '100%' }}
        />
      </PosterImage>
    </section>
  </AnimatedLink>
)

const CompainesHelpedCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const CompaniesHelped = ({ clients }) => (
  <Fragment>
    <Row>
      <CompainesHelpedCol width={[1, 1, 1, 1, 1 / 2]}>
        <Subtitle>Other clients we helped</Subtitle>
      </CompainesHelpedCol>
    </Row>
    <LogoGrid companies={clients} />
  </Fragment>
)

const SectionWrap = styled.div`
  padding-bottom: ${({ theme }) => theme.space[5]};
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]};
    padding-top: ${({ theme }) => theme.space[7]};
  `}
`

const ProjectsSection = ({ related, title, clients }) => (
  <Grid>
    <SectionWrap>
      {related && related.length > 0 && (
        <Row>
          <Col width={[0, 0, 0, 0, 1 / 2]}>
            <Padding top={7} bottom={5}>
              <SectionTitle>
                {title}
                <br />
                <Emphasis>related projects</Emphasis>
              </SectionTitle>
            </Padding>
            {related[0] && related[1] && <PosterLinks project={related[0]} />}
          </Col>
          <Col width={[1, 1, 1, 1, 0]}>
            <SectionTitle>
              {title}
              <br />
              <Emphasis>related projects</Emphasis>
            </SectionTitle>
          </Col>
          {!related[1] && (
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <PosterLinks project={related[0]} />
            </Col>
          )}
          {related[1] && (
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <PosterLinks project={related[1]} />
            </Col>
          )}
          <Col width={[1, 1, 1, 1, 1 / 2]} />
        </Row>
      )}
      {clients && clients.length > 0 && <CompaniesHelped clients={clients} />}
    </SectionWrap>
  </Grid>
)

export default ProjectsSection

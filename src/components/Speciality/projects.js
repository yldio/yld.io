import React, { Fragment } from 'react'
import { Row, Col, Grid } from '../grid'
import { H2, H3, H5, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import { AnimatedLink, CardHeader, PosterImage } from '../Common/animatedLink'
import Companies from '../Homepage/companies'

const PosterLinks = ({ project }) => (
  <AnimatedLink to={`/case-study/${project.slug}`}>
    <section
      style={{
        background: `#${project.posterColor}`
      }}
    >
      <CardHeader>
        <H3 noMargin reverse>
          {project.title}
        </H3>
        <Paragraph reverse muted>
          {project.introSentence}
        </Paragraph>
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

const CompaniesHelped = ({ speciality, noOther }) => (
  <Fragment>
    <Row>
      <Col width={[1, 1, 1, 1, 1 / 2]}>
        <Padding top={5} bottom={3}>
          <H5 bold>{noOther ? 'C' : 'Other c'}lients we helped</H5>
        </Padding>
      </Col>
    </Row>
    <Companies companies={speciality.clients} />
  </Fragment>
)

const ProjectsSection = ({ speciality }) => {
  const firstRelated = speciality.relatedProjects[0]
  const secondRelated = speciality.relatedProjects[1]
  return speciality.relatedProjects ? (
    <Grid>
      <Padding top={5} bottom={5}>
        <Row>
          <Col width={[0, 0, 0, 0, 1 / 2]}>
            <Padding top={7} bottom={5}>
              <H2 noMargin noBottom>
                {speciality.title}
              </H2>
              <H2 noMargin muted noTop>
                related projects
              </H2>
            </Padding>
            {firstRelated && secondRelated && (
              <PosterLinks project={firstRelated} />
            )}
          </Col>
          <Col width={[1, 1, 1, 1, 0]}>
            <H2 noMargin>{speciality.title}</H2>
            <H2 noMargin muted>
              related projects
            </H2>
          </Col>
          {!secondRelated && (
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <PosterLinks project={firstRelated} />
            </Col>
          )}
          {secondRelated && (
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <PosterLinks project={secondRelated} />
            </Col>
          )}
          <Col width={[1, 1, 1, 1, 1 / 2]} />
        </Row>
        <CompaniesHelped speciality={speciality} />
      </Padding>
    </Grid>
  ) : (
    <Grid>
      <Padding top={5} bottom={5}>
        <CompaniesHelped noOther speciality={speciality} />
      </Padding>
    </Grid>
  )
}
export default ProjectsSection

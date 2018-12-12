import React from 'react'
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

const ProjectsSection = ({ specialty }) => (
  <Grid>
    <Padding top={5} bottom={5}>
      <Row>
        <Col width={[0, 0, 0, 0, 1 / 2]}>
          <Padding top={7} bottom={5}>
            <H2 noMargin noBottom>
              {specialty.title}
            </H2>
            <H2 noMargin muted noTop>
              related projects
            </H2>
          </Padding>
          <PosterLinks project={specialty.relatedProjects[0]} />
        </Col>
        <Col width={[1, 1, 1, 1, 0]}>
          <H2 noMargin>{specialty.title}</H2>
          <H2 noMargin muted>
            related projects
          </H2>
        </Col>
        <Col width={[1, 1, 1, 1, 1 / 2]}>
          <PosterLinks project={specialty.relatedProjects[1]} />
        </Col>
        <Col width={[1, 1, 1, 1, 1 / 2]} />
      </Row>
      <Row>
        <Col width={[1, 1, 1, 1, 1 / 2]}>
          <Padding top={5} bottom={3}>
            <H5 bold>Other Clients we helped</H5>
          </Padding>
        </Col>
      </Row>
      <Companies companies={specialty.clients} />
    </Padding>
  </Grid>
)

export default ProjectsSection

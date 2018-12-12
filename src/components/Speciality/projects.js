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
        <Col md={6} sm={false} xs={false}>
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
        <Col md={false} sm={12} xs={12}>
          <H2 noMargin>{specialty.title}</H2>
          <H2 noMargin muted>
            related projects
          </H2>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <PosterLinks project={specialty.relatedProjects[1]} />
        </Col>
        <Col md={6} sm={12} xs={12} />
      </Row>
      <Row>
        <Col md={6} sm={12} xs={12}>
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

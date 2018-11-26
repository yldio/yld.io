import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H3, H5, Paragraph } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import {
  AnimatedLink,
  CardHeader,
  PosterImage
} from '../components/Common/animatedLink'
import Companies from '../components/Homepage/companies'

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
  <Grid className="grid">
    <Padding top={5} bottom={5}>
      <Row>
        <Col md={6} sm={false} xs={false}>
          <Padding top={7} bottom={5}>
            <H1 noMargin>{specialty.title}</H1>
            <H1 noMargin muted>
              related projects
            </H1>
          </Padding>
          <PosterLinks project={specialty.relatedProjects[0]} />
        </Col>
        <Col md={false} sm={12} xs={12}>
          <H1 noMargin>{specialty.title}</H1>
          <H1 noMargin muted>
            related projects
          </H1>
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
        <Companies companies={specialty.clients} />
      </Row>
    </Padding>
  </Grid>
)

export default ProjectsSection

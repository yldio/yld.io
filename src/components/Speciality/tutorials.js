import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import GrayBackground from '../GrayBG'
import { H1, H5, Paragraph } from '../Typography'
import StyledLink from '../styledLink'

const TutorialsSection = ({ specialty }) => (
  <GrayBackground noTop>
    <Grid>
      <Padding top={4} bottom={6}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <H1>Tutorials</H1>
            <Paragraph>
              NodeJS tutorials created by members of YLD for the community.
            </Paragraph>
          </Col>
          <Col md={6} sm={12} xs={12}>
            {specialty.externalResources
              .filter(externalResource => externalResource.type === `Tutorial`)
              .slice(0, 3)
              .map(externalResource => (
                <Padding top={2} bottom={2} key={`${externalResource.id}`}>
                  <H5 bold>{externalResource.title}</H5>
                  <a href={externalResource.link}>
                    {externalResource.additionalInfo}
                  </a>
                </Padding>
              ))}
            <Padding top={3}>
              <StyledLink href={specialty.externalResources[7].link}>
                {specialty.externalResources[7].title}
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Grid>
  </GrayBackground>
)

export default TutorialsSection

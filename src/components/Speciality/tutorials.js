import React from 'react'
import remcalc from 'remcalc'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import GrayBackground from '../GrayBG'
import { SmallerH2, H5, Paragraph } from '../Typography'
import Li from '../listItem'
import StyledLink from '../styledLink'

const TutorialsGrid = styled(Grid)`
  padding-bottom: ${remcalc(18)};
`

const TutorialsSection = ({ specialty }) => (
  <GrayBackground noTop>
    <TutorialsGrid className="grid">
      <Padding top={4} bottom={5}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <SmallerH2>Tutorials</SmallerH2>
            <Paragraph>
              NodeJS tutorials created by members of YLD for the community.
            </Paragraph>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <ul>
              {specialty.externalResources
                .filter(
                  externalResource => externalResource.type === `Tutorial`
                )
                .slice(0, 3)
                .map(externalResource => (
                  <Li key={`${externalResource.id}`}>
                    <H5 bold noBottom>
                      {externalResource.title}
                    </H5>
                    <a
                      href={externalResource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {externalResource.additionalInfo}
                    </a>
                  </Li>
                ))}
            </ul>
            <Padding top={3}>
              <StyledLink href={specialty.externalResources[7].link}>
                {specialty.externalResources[7].title}
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </TutorialsGrid>
  </GrayBackground>
)

export default TutorialsSection

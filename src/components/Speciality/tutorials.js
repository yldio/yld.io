import React from 'react'
import remcalc from 'remcalc'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import GrayBackground from '../GrayBG'
import { SmallerH2, H5, Paragraph } from '../Typography'
import Li from '../listItem'
import StyledLink from '../styledLink'

const TutorialsGrid = styled(Grid)`
  padding-bottom: ${remcalc(18)};
`

const TutorialsSection = ({ specialty }) =>
  specialty.externalResources.filter(
    externalResource => externalResource.type === `Tutorial`
  ).length > 0 ? (
    <GrayBackground noTop>
      <TutorialsGrid>
        <Padding top={4} bottom={5}>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <SmallerH2>Tutorials</SmallerH2>
              <Paragraph>
                NodeJS tutorials created by members of YLD for the community.
              </Paragraph>
            </Col>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
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
  ) : null

export default TutorialsSection

import React from 'react'
import remcalc from 'remcalc'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import GreyBackground from '../GreyBG'
import { SectionTitleH2, SubtitleH3, BodyPrimary } from '../Typography'
import Li from '../listItem'
import StyledLink from '../styledLink'

const TutorialsGrid = styled(Grid)`
  padding-bottom: ${remcalc(18)};
`

const TutorialsSection = ({ speciality }) =>
  speciality.externalResources.filter(
    externalResource => externalResource.type === `Tutorial`
  ).length > 0 ? (
    <GreyBackground>
      <TutorialsGrid>
        <Padding top={4} bottom={5}>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <SectionTitleH2>Tutorials</SectionTitleH2>
              <BodyPrimary>
                NodeJS tutorials created by members of YLD for the community.
              </BodyPrimary>
            </Col>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <ul>
                {speciality.externalResources
                  .filter(
                    externalResource => externalResource.type === `Tutorial`
                  )
                  .slice(0, 3)
                  .map(externalResource => (
                    <Li key={`${externalResource.id}`}>
                      <SubtitleH3>{externalResource.title}</SubtitleH3>
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
                <StyledLink href={speciality.externalResources[7].link}>
                  {speciality.externalResources[7].title}
                </StyledLink>
              </Padding>
            </Col>
          </Row>
        </Padding>
      </TutorialsGrid>
    </GreyBackground>
  ) : null

export default TutorialsSection

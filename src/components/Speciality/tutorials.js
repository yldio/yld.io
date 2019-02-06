import React from 'react'
import remcalc from 'remcalc'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import GreyBackground from '../GreyBG'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import CustomisedBulletpoint from '../CustomisedBulletpoint'
import ExternalAnchor from '../Common/ExternalAnchor'
import StyledLink from '../styledLink'

const TutorialsGrid = styled(Grid)`
  padding-bottom: ${remcalc(18)};
`

const TutorialsSection = ({ tutorials, externalResources }) =>
  tutorials.length > 0 ? (
    <GreyBackground>
      <TutorialsGrid>
        <Padding vertical={5}>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <SectionTitle>Tutorials</SectionTitle>
              <BodyPrimary>
                NodeJS tutorials created by members of YLD for the community.
              </BodyPrimary>
            </Col>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <ul>
                {tutorials.slice(0, 3).map(externalResource => (
                  <CustomisedBulletpoint spaced key={`${externalResource.id}`}>
                    <Subtitle>{externalResource.title}</Subtitle>
                    <ExternalAnchor href={externalResource.link}>
                      {externalResource.additionalInfo}
                    </ExternalAnchor>
                  </CustomisedBulletpoint>
                ))}
              </ul>
              <Padding top={3}>
                <StyledLink href="http://nodetuts.com/">
                  More tutorials
                </StyledLink>
              </Padding>
            </Col>
          </Row>
        </Padding>
      </TutorialsGrid>
    </GreyBackground>
  ) : null

export default TutorialsSection

import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import GreyBackground from '../Common/GreyBackground'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from '../Common/ExternalAnchor'
import StyledLink from '../Common/StyledLink'
import Hr from '../Common/Hr'

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
            <Col width={[1, 1, 1, 1, 4 / 12]}>
              <ul>
                {tutorials.slice(0, 3).map(externalResource => (
                  <li key={`${externalResource.id}`}>
                    <Subtitle>{externalResource.title}</Subtitle>
                    <ExternalAnchor href={externalResource.link}>
                      {externalResource.additionalInfo}
                    </ExternalAnchor>
                    <Hr />
                  </li>
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

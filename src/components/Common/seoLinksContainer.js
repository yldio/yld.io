import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import { SectionTitle, Subtitle } from '../Typography'
import { Grid, Row, Col } from '../grid'
import SeoLinks from './seoLinks'

const WeWorkWithPadding = styled.div`
  padding-top: ${props => (props.index === 1 ? remcalc(36) : remcalc(24))};
  ${breakpoint('tablet')`
    padding-top: ${props => remcalc(props.index * 72)};
  `}
`

const SeoLinksContainer = ({ service }) => {
  const {
    specialityAreaTitle1,
    specialityAreaItems1,
    specialityAreaTitle2,
    specialityAreaItems2,
    specialityAreaTitle3,
    specialityAreaItems3,
    specialityAreaTitle4,
    specialityAreaItems4
  } = service

  return (
    <Grid>
      <Row>
        <Col width={[1]}>
          <SectionTitle>We work with</SectionTitle>
        </Col>
      </Row>
      <Row>
        <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
          <WeWorkWithPadding index={1}>
            {specialityAreaTitle1 ? (
              <Subtitle>{specialityAreaTitle1}</Subtitle>
            ) : null}
            <SeoLinks items={specialityAreaItems1} />
          </WeWorkWithPadding>
        </Col>
        <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
          {specialityAreaItems2 && (
            <WeWorkWithPadding index={2}>
              <Subtitle>{specialityAreaTitle2}</Subtitle>
              <SeoLinks items={specialityAreaItems2} />
            </WeWorkWithPadding>
          )}
        </Col>
        <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
          {specialityAreaItems3 && (
            <WeWorkWithPadding index={3}>
              <Subtitle>{specialityAreaTitle3}</Subtitle>
              <SeoLinks items={specialityAreaItems3} />
            </WeWorkWithPadding>
          )}
        </Col>
        <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]}>
          {specialityAreaItems4 && (
            <WeWorkWithPadding index={4}>
              <Subtitle>{specialityAreaTitle4}</Subtitle>
              <SeoLinks items={specialityAreaItems4} />
            </WeWorkWithPadding>
          )}
        </Col>
      </Row>
    </Grid>
  )
}

export default SeoLinksContainer

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

const SeoLinksColumn = ({ speciality: { title, item } }, index) => (
  <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]} key={index}>
    {item && (
      <WeWorkWithPadding index={index + 1}>
        <Subtitle>{title}</Subtitle>
        <SeoLinks items={item} />
      </WeWorkWithPadding>
    )}
  </Col>
)

const SeoLinksContainer = ({ service }) => {
  const services = [
    {
      title: service.specialityAreaTitle1,
      item: service.specialityAreaItems1
    },
    {
      title: service.specialityAreaTitle2,
      item: service.specialityAreaItems2
    },
    {
      title: service.specialityAreaTitle3,
      item: service.specialityAreaItems3
    },
    {
      title: service.specialityAreaTitle4,
      item: service.specialityAreaItems4
    }
  ]

  return (
    <Grid>
      <Row>
        <Col width={[1]}>
          <SectionTitle>We work with</SectionTitle>
        </Col>
      </Row>
      <Row>
        {services.map((speciality, index) =>
          SeoLinksColumn({ speciality }, index)
        )}
      </Row>
    </Grid>
  )
}

export default SeoLinksContainer

import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { SectionTitle, Subtitle } from '../Typography'
import { Grid, Row, Col } from '../grid'
import SeoLinks from './seoLinks'

const StyledLinksColumn = styled.div`
  padding-top: ${props => props.theme.spacing[props.index === 1 ? 3 : 2]};
  ${breakpoint('tablet')`
    padding-top: ${props => remcalc(props.index * 72)};
  `}
`

const SeoLinksColumn = ({ speciality: { title, item } }, index) => (
  <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]} key={index}>
    {item && (
      <StyledLinksColumn index={index + 1}>
        <Subtitle>{title}</Subtitle>
        <SeoLinks items={item} />
      </StyledLinksColumn>
    )}
  </Col>
)

const SeoLinksContainer = ({ service, sectionTitle }) => {
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
          <SectionTitle>{sectionTitle}</SectionTitle>
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

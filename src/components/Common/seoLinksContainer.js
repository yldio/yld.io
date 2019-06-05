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

const SeoLinksColumn = ({ speciality: { title, items } }, index) => (
  <Col width={[1, 1, 1, 1, 1 / 2, 3 / 12]} key={index}>
    {items && items.length && (
      <StyledLinksColumn index={index + 1}>
        <Subtitle>{title}</Subtitle>
        <SeoLinks items={items} />
      </StyledLinksColumn>
    )}
  </Col>
)

const SeoLinksContainer = ({ specialities, sectionTitle }) => (
  <Grid>
    <Row>
      <Col width={[1]}>
        <SectionTitle>{sectionTitle}</SectionTitle>
      </Col>
    </Row>
    <Row>
      {specialities.map((speciality, index) =>
        SeoLinksColumn({ speciality }, index)
      )}
    </Row>
  </Grid>
)

export default SeoLinksContainer

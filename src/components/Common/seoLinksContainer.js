import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import { SectionTitle, Subtitle } from '../Typography'
import { Grid, Row, Col } from '../grid'
import SeoLinks from './seoLinks'

const StyledLinksColumn = styled.div`
  padding-top: ${({ theme, index }) => theme.spacing[index === 1 ? 3 : 2]};
  ${breakpoint('tablet')`
    padding-top: ${({ index }) => remcalc(index * 72)};
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
  <Padding
    top={{ smallPhone: 3, tablet: 4 }}
    bottom={{ smallTablet: 3.5, tablet: 5 }}
  >
    <Grid>
      <Row>
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle>{sectionTitle}</SectionTitle>
        </Col>
      </Row>
      <Row>
        {specialities.map((speciality, index) =>
          SeoLinksColumn({ speciality }, index)
        )}
      </Row>
    </Grid>
  </Padding>
)

export default SeoLinksContainer

import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import Image from '../Common/Image'
import { Grid, ColumnLayout, Col } from '../grid'
import { SectionTitle } from '../Typography'

const PaddedCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
  ${breakpoint('smallPhone')`
    padding-bottom: ${props => props.theme.spacing[3]}
    &:last-child {
      padding-bottom: 0
    }
  `}
  ${breakpoint('tablet')`
    padding-bottom: 0
  `}
`

const PartnersSection = ({ partnershipsTitle, partners }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3.5, tablet: 5 }}
    >
      <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
        <SectionTitle>{partnershipsTitle}</SectionTitle>
      </Padding>
      <ColumnLayout cols={4} items={partners}>
        {({ Col, item: partner }) => {
          const { image } = partner
          return (
            <PaddedCol block={false}>
              <Image image={image} />
            </PaddedCol>
          )
        }}
      </ColumnLayout>
    </Padding>
  </Grid>
)

export default PartnersSection

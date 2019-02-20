import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import Image from '../Common/Image'
import { Grid, Col, Row } from '../grid'
import { SectionTitle } from '../Typography'

const PaddedCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;

  ${breakpoint('smallPhone')`
    padding-bottom: ${props => props.theme.spacing[1]}
    &:last-child {
      padding-bottom: 0
    }
  `}
  ${breakpoint('tablet')`
    padding-bottom: 0
  `}
`

const Partner = ({ image }) => (
  <PaddedCol block={false} width={[1 / 2, 1 / 2, 1 / 2, 1 / 2, 3 / 12]}>
    <Image
      image={image}
      width="250px"
      style={{ filter: 'grayscale(1)', saturate: '0' }}
    />
  </PaddedCol>
)

const Partners = ({ title, partners }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3.5, tablet: 5 }}
    >
      <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
        <SectionTitle>{title}</SectionTitle>
      </Padding>
      <Row>
        {partners.map((partner, idx) => (
          <Partner key={idx} image={partner.image} />
        ))}
      </Row>
    </Padding>
  </Grid>
)

export default Partners

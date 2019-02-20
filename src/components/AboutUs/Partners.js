import React from 'react'
import { Padding } from 'styled-components-spacing'

import Image from '../Common/Image'
import { Grid, Row } from '../grid'
import { SectionTitle } from '../Typography'
import PaddedCol from './PaddedCol'

const Partner = ({ image }) => (
  <PaddedCol width={[1 / 2, 1 / 2, 1 / 2, 1 / 2, 3 / 12]}>
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

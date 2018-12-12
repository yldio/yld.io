import React from 'react'
import { Grid, Row, Col } from '../grid'
import styled from 'styled-components'

const Column = styled(Col)`
  max-height: 108px;
  display: flex;
  align-items: center;
`

const Companies = ({ companies }) => (
  <Grid>
    <Row>
      {companies.map(company => (
        <Column width={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 4]} key={company.id}>
          <img
            style={{ minWidth: 100 }}
            alt={company.title}
            src={company.fluid.src}
          />
        </Column>
      ))}
    </Row>
  </Grid>
)

export default Companies

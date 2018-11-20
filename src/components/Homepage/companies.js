import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import Image from '../Common/Image'
import styled from 'styled-components'

const Column = styled(Col)`
  max-height: 108px;
  display: flex;
  align-items: center;
`

const Companies = ({ companies }) => (
  <Col sm={12}>
    <Row>
      {companies.map(company => (
        <Column xs={6} sm={4} md={3} key={company.id}>
          <Image image={company} />
        </Column>
      ))}
    </Row>
  </Col>
)

export default Companies

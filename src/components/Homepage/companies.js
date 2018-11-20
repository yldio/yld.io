import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

const Companies = ({ companies }) => (
  <Col sm={12}>
    <Row>
      {companies.map(company => (
        <Col
          xs={6}
          sm={4}
          md={3}
          key={company.id}
          style={{ maxHeight: 108, display: 'flex', alignItems: 'center' }}
        >
          <img src={company.file.url} alt={company.title} />
        </Col>
      ))}
    </Row>
  </Col>
)

export default Companies

import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

const Companies = ({ companies }) => (
  <Row>
    {companies.map(company => (
      <Col
        sm={6}
        md={3}
        key={company.id}
        style={{ height: 108, display: 'flex', alignItems: 'center' }}
      >
        <img src={company.file.url} alt={company.file.fileName} />
      </Col>
    ))}
  </Row>
)

export default Companies

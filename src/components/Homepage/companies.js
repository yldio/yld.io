import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import Image from '../Common/Image'

const Column = styled(Col)`
  max-height: 108px;
  display: flex;
  align-items: center;
`

const Companies = ({ companies = [] }) =>
  companies ? (
    <Row>
      {companies.map(company => (
        <Column
          width={[1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 4, 1 / 4]}
          key={company.id}
        >
          <Image image={company} />
        </Column>
      ))}
    </Row>
  ) : null

export default Companies

import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import Image from '../Common/Image'
import ExternalAnchor from '../Common/ExternalAnchor'

const Column = styled(Col)`
  max-height: 108px;
  display: flex;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing[1]};
`

const LogoGrid = ({ companies }) => (
  <Row>
    {companies.map(company => (
      <Column
        width={[1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 3, 1 / 4]}
        key={company.id}
      >
        {company.url ? (
          <ExternalAnchor href={company.url} title={company.title}>
            <Image
              image={company.image}
              width="250px"
              style={{ filter: 'grayscale(1)', saturate: '0' }}
            />
          </ExternalAnchor>
        ) : (
          <Image
            image={company}
            title={company.title}
            style={{ filter: 'grayscale(1)', saturate: '0' }}
          />
        )}
      </Column>
    ))}
  </Row>
)

export default LogoGrid

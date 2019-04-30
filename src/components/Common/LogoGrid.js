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

const LogoGrid = ({ logos }) => (
  <Row>
    {logos.map(logo => (
      <Column width={[1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 3, 1 / 4]} key={logo.id}>
        {logo.url ? (
          <ExternalAnchor href={logo.url}>
            <Image
              image={logo.image}
              width="250px"
              style={{ filter: 'grayscale(1)', saturate: '0' }}
            />
          </ExternalAnchor>
        ) : (
          <Image
            image={logo}
            style={{ filter: 'grayscale(1)', saturate: '0' }}
          />
        )}
      </Column>
    ))}
  </Row>
)

export default LogoGrid

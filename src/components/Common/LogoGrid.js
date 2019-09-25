import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import Image from '../Common/Image'
import ExternalAnchor from '../Common/ExternalAnchor'
import { Subtitle } from '../Typography'

const Column = styled(Col)`
  max-height: 108px;
  display: flex;
  align-items: center;
  padding-top: ${props => props.theme.space[2]};
`

const StyledSubtitle = styled(Subtitle)`
  padding-bottom: ${props => props.theme.space[4]};
`
const StyledRow = styled(Row)`
  padding-bottom: ${props => props.theme.space[6]};
`

const LogoGrid = ({ companies }) => (
  <StyledRow>
    <Column width={1}>
      <StyledSubtitle>
        Some of the companies we&apos;ve worked with
      </StyledSubtitle>
    </Column>
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
  </StyledRow>
)

export default LogoGrid

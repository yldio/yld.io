import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Image from '../Common/Image'
import ExternalAnchor from '../Common/ExternalAnchor'

const StyledRow = styled(Row)`
  padding-bottom: ${props => props.theme.space[4]};

  ${breakpoint('tablet')`
   padding-bottom: ${props => props.theme.space[6]};
  `}
`

const LogoItem = styled(Col)`
  display: flex;
  align-items: center;
  padding-top: ${props => props.theme.space[2]};

  ${breakpoint('smallPhone', 'smallTablet')`
    :nth-child(even) {
      padding-right: ${props => props.theme.space[2]};
    }

    :nth-child(odd) {
      padding-left: ${props => props.theme.space[2]};
    }
  `}

  ${breakpoint('smallTablet', 'tablet')`
    :nth-child(3n-1) {
      padding-right: ${props => props.theme.space[2]};
    }

    :nth-child(3n) {
      padding-left: ${props => props.theme.space[2]};
      padding-right: ${props => props.theme.space[2]};
    }

    :nth-child(3n+1) {
      padding-left: ${props => props.theme.space[2]};
    }
  `}
`

const LogoGrid = ({ companies }) => (
  <StyledRow>
    {companies.map(company => (
      <LogoItem
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
      </LogoItem>
    ))}
  </StyledRow>
)

export default LogoGrid

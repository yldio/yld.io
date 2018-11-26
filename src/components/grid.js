import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'

const breakpoints = {
  smallPhone: 0,
  phone: 471,
  largePhone: 553,
  smallTablet: 899, // sharon
  tablet: 900,
  desktop: 1197
}

const GridStyled = styled(Box)`
  @media (min-width: ${breakpoints.phone}px) {
    max-width: 408px;

    p {
      max-width: 390px;
    }
  }
  @media (min-width: ${breakpoints.largePhone}px) {
    max-width: 480px;
    p {
      max-width: 390px;
    }
  }
  @media (min-width: ${breakpoints.smallTablet}px) {
    max-width: 683px;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    max-width: 982px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 1100px;
  }

  max-width: 272px;
`

export const Grid = props => <GridStyled {...props} mx="auto" />

export const Row = props => (
  <Flex
    {...props}
    css={{ flexWrap: 'wrap' }}
    mx={[-2, -3, -60, -42, -48, -48]}
  />
)

export const Col = props => (
  <Box
    {...props}
    css={{ flexWrap: 'wrap' }}
    px={[2, 3, 60, 42, 48, 48]}
    flex="1 1 auto"
  />
)

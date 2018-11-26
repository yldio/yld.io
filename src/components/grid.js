import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import breakpoint from 'styled-components-breakpoint'

const GridStyled = styled(Box)`
  ${breakpoint('phone')`
    max-width: 408px;

    p {
      max-width: 390px
    }
  `}
    ${breakpoint('largePhone')`
    max-width: 480px;
    p {
      max-width: 390px
    }
  `}
    ${breakpoint('smallTablet')`
    max-width: 683px;
  `}
    ${breakpoint('tablet')`
    max-width: 982px;
  `}
  ${breakpoint('desktop')`
    max-width: 1100px;
  `}



 max-width: 272px;
`

export const Grid = props => <GridStyled {...props} mx="auto" />

export const Row = props => <Flex {...props} mx={-3} />

export const Column = props => <Box {...props} px={3} flex="1 1 auto" />

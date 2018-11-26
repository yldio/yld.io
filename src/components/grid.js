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

// phone
// largePhone
// smallTablet
// tablet
// desktop

// const space = {
//   0: '0',
//   0.5: remcalc(6),
//   1: remcalc(12),
//   1.5: remcalc(18),
//   2: remcalc(24),
//   3: remcalc(36),
//   3.5: remcalc(54),
//   4: remcalc(72),
//   5: remcalc(108),
//   6: remcalc(144),
//   7: remcalc(288),
//   30: remcalc(30),
//   60: remcalc(60)
// }

export const Grid = props => <GridStyled {...props} mx="auto" />

export const Row = props => (
  <Flex {...props} mx={[-2, -3, -60, -42, -48, -48]} />
)

export const Col = props => (
  <Box {...props} px={[2, 3, 60, 42, 48, 48]} flex="1 1 auto" />
)

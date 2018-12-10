import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import H1 from './h1'

// this is to be able to pass the className prop down to add styles on later
const H2 = props => React.createElement(H1.withComponent('h2'), props)

export const SmallerH2 = styled.h2`
  font-size: ${remcalc(30)};
  padding: ${remcalc(29)} 0 ${remcalc(25)} 0;
  line-height: ${remcalc(30)};
  font-weight: 500;
  color: ${props => props.theme.colors.text};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('center')`
    text-align:center
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(42)};
    padding: ${remcalc(21)} 0;
    line-height: ${remcalc(42)};
  `}
`

export default H2

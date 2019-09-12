import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

const ChevronSvg = styled.svg`
  stroke: currentColor;
  stroke-width: ${remcalc(3)};
  fill: none;
  transform: rotate(135deg);
  transition: transform 0s ease 0.1s;

  ${is('up')`
    transform: translateY(2px) rotate(-45deg);
  `}
`

const Chevron = ({ direction = 'down' }) => (
  <ChevronSvg viewBox="0 0 6 6" width="6" height="6" up={direction === 'up'}>
    <polyline points="0,0 6,0 6,6" />
  </ChevronSvg>
)

export default Chevron

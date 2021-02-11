import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

const ChevronSvg = styled.svg`
  stroke: currentColor;
  stroke-width: ${remcalc(3)};
  fill: none;
  transform: rotate(135deg);
  transition: transform 0s ease 0.1s;

  ${is('up')`
    transform: translateY(2px) rotate(-45deg);
  `}
`;

const Chevron = ({ direction = 'down', size = 6 }) => (
  <ChevronSvg
    viewBox="0 0 6 6"
    width={size}
    height={size}
    up={direction === 'up'}
  >
    <polyline points="0,0 6,0 6,6" />
  </ChevronSvg>
);

export default Chevron;

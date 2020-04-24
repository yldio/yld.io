import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import modifiers from '../Typography/modifiers';

const Hr = styled.hr`
  height: ${remcalc(1)};
  margin: ${remcalc(17)} 0 0 0;
  padding: 0 0 ${remcalc(18)} 0;

  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.text};
  opacity: 0.25;

  ${modifiers};

  ${is('short')`
    width: 60px;
  `};
`;

export default Hr;

import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';

import modifiers from './modifiers';

const CalendarDay = styled.p`
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  font-weight: 500;
  font-size: ${remcalc(36)};
  line-height: ${remcalc(42)};
  ${modifiers}

  ${breakpoint('tablet')`
    font-size: ${remcalc(60)};
    line-height: ${remcalc(72)};
    ${modifiers}
  `}
`;

export default CalendarDay;

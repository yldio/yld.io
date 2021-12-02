import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';

import modifiers from './modifiers';

const DisplayTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;
  font-size: ${remcalc(26)};
  line-height: ${remcalc(30)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  ${modifiers}

  ${breakpoint('tablet')`
    font-size: ${remcalc(32)};
    line-height: ${remcalc(36)};
    padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
    ${modifiers}
  `}
`;

export default DisplayTitle;

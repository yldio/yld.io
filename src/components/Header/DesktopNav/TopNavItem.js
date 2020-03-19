import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';

import * as itemStyles from './itemStyles';

const TopNavItem = styled.li.attrs(
  ({ themeVariation = 'white', primary = false }) => ({
    states: {
      default: itemStyles[themeVariation + (primary ? 'Primary' : '')],
      hover: itemStyles[themeVariation + (primary ? 'Primary' : '') + 'Hover'],
      clickTap:
        itemStyles[themeVariation + (primary ? 'Primary' : '') + 'Hover'],
      current: itemStyles['current' + (primary ? 'Primary' : '')],
    },
  }),
)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  ${breakpoint('header')`
    margin-right: ${remcalc(6)};

    &:last-child {
      margin-right: ${remcalc(0)};
    }
  `}
`;

export default TopNavItem;

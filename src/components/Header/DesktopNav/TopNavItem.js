import styled from 'styled-components';
import remcalc from 'remcalc';

import { lightStates, darkStates } from './outerItemStates';

const TopNavItem = styled.li.attrs(props => ({
  states: props.themeVariation === 'dark' ? darkStates : lightStates,
}))`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  @media screen and (min-width: 1000px) {
    margin-right: ${remcalc(6)};

    &:last-child {
      margin-right: ${remcalc(0)};
    }
  }
`;

export default TopNavItem;

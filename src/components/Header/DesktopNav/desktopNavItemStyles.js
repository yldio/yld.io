import { css } from 'styled-components';
import remcalc from 'remcalc';

const topNavItemStyles = css`
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(10)} ${remcalc(15)} ${remcalc(14)};
`;

export default topNavItemStyles;

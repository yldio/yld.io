import { css } from 'styled-components';
import remcalc from 'remcalc';

const mobileNavItemStyles = css`
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(11)} ${remcalc(38)} ${remcalc(9)} ${remcalc(40)};
`;

export default mobileNavItemStyles;

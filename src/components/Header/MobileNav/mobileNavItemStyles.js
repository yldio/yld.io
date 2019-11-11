import { css } from 'styled-components';
import remcalc from 'remcalc';

const mobileNavItemStyles = css`
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  padding: ${remcalc('9')} ${remcalc('34')} ${remcalc('7')} ${remcalc('20')};
  margin: ${remcalc('4')};
`;

export default mobileNavItemStyles;

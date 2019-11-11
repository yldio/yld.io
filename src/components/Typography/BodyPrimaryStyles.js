import { css } from 'styled-components';
import remcalc from 'remcalc';

import modifiers from './modifiers';

const BodyPrimaryStyles = css`
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(12)} 0;
  ${modifiers}
`;

export default BodyPrimaryStyles;

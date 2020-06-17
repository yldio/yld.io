import { css } from 'styled-components';
import remcalc from 'remcalc';

import modifiers from './modifiers';

const BodyPrimaryStyles = css`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  padding: ${({ theme }) => `${theme.space[2]} 0`};
  ${modifiers}
`;

export default BodyPrimaryStyles;

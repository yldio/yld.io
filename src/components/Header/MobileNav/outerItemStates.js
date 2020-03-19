import { css } from 'styled-components';

const defaultStyles = css`
  color: #858196;
`;

const hoverActiveStyles = css`
  font-weight: bold;
`;

const outerItemStates = {
  default: defaultStyles,
  hoverActive: hoverActiveStyles,
};

export default outerItemStates;

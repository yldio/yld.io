import { css } from 'styled-components';

const defaultStyles = css`
  color: #858196;
`;

const hoverActiveStyles = css`
  color: ${props => props.theme.colors.white};
`;

const outerItemStates = {
  default: defaultStyles,
  hoverActive: hoverActiveStyles,
};

export default outerItemStates;

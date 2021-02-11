import { css } from 'styled-components';

const white = css`
  color: ${props => props.theme.colors.text};
`;

const dark = css`
  color: ${props => props.theme.colors.white};
`;

const outerItemStates = {
  white,
  dark,
};

export default outerItemStates;

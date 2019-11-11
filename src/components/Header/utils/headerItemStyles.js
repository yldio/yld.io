import { css } from 'styled-components';

const headerItemStyles = css`
  transition: opacity ${props => props.theme.animations.fast} ease-out,
    color ${props => props.theme.animations.fast} ease-out;
  outline: none;
`;

export default headerItemStyles;

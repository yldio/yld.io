import { css } from 'styled-components';

import { underlinePseudoElement } from '../../Common/StyledLink';

export const white = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  &:after {
    ${underlinePseudoElement}
    background: ${props => props.theme.colors.text};
    opacity: 0;
    transition: all ${({ theme }) => theme.animations.fast} ease-out;
  }
`;
export const whiteHover = css`
  color: ${props => props.theme.colors.secondaryText};
  &:after {
    background: ${props => props.theme.colors.secondaryText};
    opacity: 1;
  }
`;

export const whitePrimary = css`
  background: ${props => props.theme.colors.darkGrey};
  color: ${props => props.theme.colors.white};
`;
export const whitePrimaryHover = css`
  background: ${props => props.theme.colors.secondaryText};
`;

export const dark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  &:after {
    ${underlinePseudoElement}
    background: ${props => props.theme.colors.white};
    opacity: 0;
    transition: all ${({ theme }) => theme.animations.fast} ease-out;
  }
`;
export const darkHover = css`
  color: ${props => props.theme.colors.opacityWhite};
  &:after {
    background: ${props => props.theme.colors.opacityWhite};
    opacity: 1;
  }
`;

export const darkPrimary = css`
  background: ${props => props.theme.colors.vibrant};
  color: ${props => props.theme.colors.blueBg};
`;
export const darkPrimaryHover = css`
  opacity: 80%;
`;

export const current = css`
  &:after {
    opacity: 1;
  }
  font-weight: bold;
`;
export const currentPrimary = css`
  font-weight: bold;
`;

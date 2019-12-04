import { css } from 'styled-components';
import is from 'styled-is';

const modifiers = css`
  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('secondary')`
    color: ${props => props.theme.colors.secondaryText};
  `};

  ${is('muted')`
    opacity: .7;
  `};

  ${is('noPadding')`
    padding: 0;
  `};

  ${is('noPaddingTop')`
    padding-top: 0;
  `};

  ${is('noPaddingBottom')`
    padding-bottom: 0;
  `};
`;

export default modifiers;

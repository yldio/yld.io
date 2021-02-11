import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';

import OuterAnchorItem from './OuterAnchorItem';

const darkTheme = css`
  background: ${props => props.theme.colors.vibrant};
  > a {
    color: ${props => props.theme.colors.blueBg} !important;
  }
`;

const whiteTheme = css`
  background: ${props => props.theme.colors.blueBg};
  > a {
    color: ${props => props.theme.colors.white} !important;
  }
`;

const ContactItem = styled(OuterAnchorItem)`
  margin: ${remcalc(10)} ${remcalc(25)};
  padding: ${remcalc(5)} 0;
  text-align: center;

  ${props => (props.themeVariation === 'white' ? whiteTheme : darkTheme)}

  ${breakpoint('smallTablet')`
    display: none;
  `}
`;

export default ContactItem;

import styled from 'styled-components';
import remcalc from 'remcalc';

import { UnstyledButton } from '../../Common/Button';
import outlineStyles from '../utils/outlineStyles';

const themeFn = ({ theme, themeVariation }) =>
  themeVariation === 'white' ? theme.colors.blueBg : theme.colors.white;

const CloseButton = styled(UnstyledButton)`
  position: relative;
  width: ${remcalc(80)};
  height: ${remcalc(80)};

  margin: ${remcalc(4)};
  ${outlineStyles}

  &:before, 
  &:after {
    position: absolute;
    left: ${remcalc(40)};
    content: ' ';
    height: ${remcalc(25)};
    width: ${remcalc(2)};
    background-color: ${props => themeFn(props)};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export default CloseButton;

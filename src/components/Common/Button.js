import styled from 'styled-components';
import remcalc from 'remcalc';

export const UnstyledButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  min-width: ${(props) => remcalc(props.theme.elementSizes.tappableArea)};
  min-height: ${(props) => remcalc(props.theme.elementSizes.tappableArea)};

  /* center icon inside button */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(UnstyledButton)`
  display: block;
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  box-sizing: border-box;

  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;

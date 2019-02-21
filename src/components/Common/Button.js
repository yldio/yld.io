import styled from 'styled-components'
import remcalc from 'remcalc'

const Button = styled.button`
  border: 0;
  display: block;
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  box-sizing: border-box;

  &:disabled {
    opacity: 0.5;
  }
`

export default Button

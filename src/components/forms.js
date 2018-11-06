import remcalc from 'remcalc'
// eslint-disable-next-line
import styled, { withComponent } from 'styled-components'

export const Checkbox = styled.input`
  appearance: none;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  border: solid 2px ${props => props.theme.colors.text};
  margin-right: ${remcalc(12)};
  position: relative;

  &:checked:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${props => props.theme.colors.text};
    width: ${remcalc(12)};
    height: ${remcalc(12)};
    transform: translateX(-50%) translateY(-50%);
  }
`

export const Input = styled.input`
  border: solid 2px ${props => props.theme.colors.text};
  padding: ${remcalc(18)} ${remcalc(24)};
  margin-bottom: 36px;
  display: block;
  width: 100%;
  font-size: ${remcalc(18)};
  background: ${props => props.theme.colors.greyBg};
  box-sizing: border-box;
`

export const Label = styled('label')`
  font-weight: bold;
  padding-bottom: ${remcalc(12)};
  display: block;
`

export const Textarea = Input.withComponent('textarea')

export const Button = styled.button`
  border: 0;
  display: block;
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: ${remcalc(18)};

  :disabled {
    opacity: 0.5;
  }
`

export const Fieldset = styled.section`
  display: grid;
  margin-bottom: ${remcalc(36)};
  grid-template-columns: 1fr 1fr;

  > section {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};
  }
`

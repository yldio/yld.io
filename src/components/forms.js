import remcalc from 'remcalc'
import styled from 'styled-components'

export const Checkbox = styled.input`
  appearance: none;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  min-width: ${remcalc(24)};
  min-height: ${remcalc(24)};
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
  padding: ${remcalc(16)} ${remcalc(24)};
  margin-bottom: 36px;
  display: block;
  width: 100%;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(18)};
  background: ${props => props.theme.colors.grayBg};
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
  line-height: ${remcalc(24)};
  box-sizing: border-box;

  :disabled {
    opacity: 0.5;
  }
`

export const Field = styled.section`
  margin-bottom: ${remcalc(36)};

  > section {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};
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

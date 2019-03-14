import styled from 'styled-components'
import remcalc from 'remcalc'

const ButtonAsIconWrapper = styled.button.attrs({
  type: 'button'
})`
  min-width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  min-height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  background-color: transparent;
  border: none;
  line-height: 0;
  padding: 0;

  /* center icon inside button */
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ButtonAsIconWrapper

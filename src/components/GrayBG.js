import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.section`
  background: ${props => props.theme.colors.greyBg};
  margin-top: ${remcalc(50)};

  > * {
    top: ${remcalc(-50)};
    position: relative;
  }
`

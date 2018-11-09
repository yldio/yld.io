import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.section`
  background: ${props => props.theme.colors.greyBg};
  margin-top: ${remcalc(50)};

  ${is('noTop')`
    margin-top: ${remcalc(0)};
  `}

  > * {
    top: ${remcalc(-50)};
    position: relative;

    ${is('noTop')`
      top: ${remcalc(0)};
    `}
  }
`

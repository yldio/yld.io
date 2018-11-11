import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${remcalc(17)};
  padding: ${remcalc(0)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};

  ${is('padded')`
    padding: ${remcalc(0)} 0 ${remcalc(48)} 0;
  `};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noMargin')`
      padding: 0;
  `};
`

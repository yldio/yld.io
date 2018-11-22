import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${remcalc(17)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  font-weight: 700;

  ${is('noWrap')`
    white-space: nowrap;
  `}

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noTop')`
      padding-top: 0;
  `};

  ${is('noBottom')`
      padding-bottom: 0;
  `};

  ${is('noMargin')`
      padding: 0;
  `};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};
`

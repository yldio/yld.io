import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.h6`
  color: ${props => props.theme.colors.link};
  font-family: 'PT Mono', sans-serif;
  font-size: ${remcalc(17)};
  padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
  line-height: ${remcalc(24)};
  font-weight: 400;
  text-decoration: underline;

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noUnderline')`
    text-decoration: none;
  `};

  ${is('noTop')`
      padding-top: 0;
  `};

  ${is('noMargin')`
      padding: 0;
  `};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};
`

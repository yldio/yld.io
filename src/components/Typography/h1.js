import breakpoint from 'styled-components-breakpoint'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export const h1Styles = css`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${remcalc(32)};
  line-height: ${remcalc(36)};
  padding: ${remcalc(13)} 0 ${remcalc(11)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${is('regular')`
    font-weight: normal;
  `};

  ${is('center')`
    text-align:center
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(42)};
    padding: ${remcalc(10)} 0 ${remcalc(8)} 0;
    line-height: ${remcalc(48)};

    ${is('noTop')`
      padding-top: 0;
    `};
    ${is('noBottom')`
      padding-bottom: 0;
    `}
  `};
`

export default styled.h1`
  ${h1Styles}
`

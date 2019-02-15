import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import HeaderAnchor from './HeaderAnchor'

const HomeLink = styled(HeaderAnchor)`
  display: block;
  padding-right: ${remcalc(30)};

  ${breakpoint('tablet')`
    display: none;
  `};
`
export default HomeLink

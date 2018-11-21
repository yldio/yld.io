import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import Flex from 'styled-flex-component'

export const AnimatedLink = styled(Link)`
  > section {
    transition: all 250ms ease;
  }

  &:hover {
    section {
      transform: scale(0.97);
    }
  }
`

export const PosterImage = styled(Flex)`
  background: #${props => props.color};

  max-width: 100%;

  ${breakpoint('tablet')`
    height: 528px;
  `}
  ${breakpoint('desktop')`
    width: 475px;
    height: 473px;
  `}
`

export const CardHeader = styled.header`
  padding: ${remcalc(24)} ${remcalc(36)} ${remcalc(22)} ${remcalc(36)};
  max-width: ${remcalc(475)};
  box-sizing: border-box;

  > div {
    max-width: ${remcalc(310)};
  }
`

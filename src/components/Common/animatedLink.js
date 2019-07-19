import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'

export const AnimatedLink = styled(Link)`
  > section {
    transition: all ${props => props.theme.animations.normal} ease;
  }

  &:hover {
    section {
      transform: scale(0.97);
    }
  }
`

AnimatedLink.propType = {
  title: PropTypes.string.isRequired
}

export const PosterImage = styled(Flex)`
  background: #${props => props.color};
  max-width: 100%;

  > img {
    align-self: center;
    justify-self: center;
    max-width: 100%
    width: 100%;
  }
`

export const CardHeader = styled.header`
  padding: ${remcalc(24)} ${remcalc(36)} ${remcalc(22)} ${remcalc(36)};
  max-width: ${remcalc(475)};
  box-sizing: border-box;

  > div {
    max-width: ${remcalc(310)};
  }
`

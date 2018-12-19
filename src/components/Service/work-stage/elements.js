import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import StyledLink from '../../styledLink'
import { H2 } from '../../Typography'

export const Item = styled.li`
  color: ${props => props.theme.colors.white};
  padding: ${remcalc(0)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  opacity: 0.5;
`

export const Graphic = styled.div`
  position: relative;
  top: ${remcalc(0)};
  height: 85%;
  width: ${remcalc(680)};
  max-width: 80%;
  left: 50%;
  transform: translateX(-50%);
`

export const How = styled(H2)`
  position: relative;
  top: -71%;
`

export const SwitchLink = styled(StyledLink)`
  margin-bottom: ${remcalc(72)};
  opacity: ${props => (props.muted ? 0.5 : 1)};
  cursor: pointer;
  ${props => (props.muted ? 'border: none;' : '')};

  &:after {
    display: ${props => (props.muted ? 'none' : 'box')};
  }

  &:not(:last-child) {
    margin-right: ${remcalc(36)};

    }
  }
`

export const WorkStageContentList = styled.ul`
  list-style-position: inside;
  ${breakpoint('desktop')`
    width: 60%
  `}
`

export const Hr = styled.hr`
  margin: 18px 0;
  ${is('short')`
    width: 25%
  `}
`

import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../../styledLink'
import { H2 } from '../../Typography'

export const Item = styled.li`
  color: ${props => props.theme.colors.white};
  padding: ${remcalc(0)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  opacity: 0.5;
  text-indent: ${remcalc(-24)};
  margin-left: ${remcalc(24)};
`

export const Graphic = styled.img`
  position: absolute;
  top: ${remcalc(-72)};
  height: ${remcalc(331)};
  left: 50%;
  transform: translateX(-50%);
`

export const How = styled(H2)`
  position: relative;
  top: ${remcalc(-60)};
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
    margin-right: ${remcalc(30)};

    ${breakpoint('desktop')`
      margin-right: ${remcalc(60)};
  `}
  }
`

// there's an odd number, give only last no padding
// there's an even number, give last 2 no padding
// if it's mobile / tablet, give only the last no padding
// index={index} last={arr.length - 1} secondLast={arr.length - 2} evenNumber
export const WorkStageGridPadding = styled.div`
  padding-bottom: ${props => (props.index === props.last ? 0 : remcalc(72))};

  ${breakpoint('desktop')`
    padding-bottom: ${props => {
    if (props.index === props.last) {
      return 0
    } else if (props.evenNumber && props.index === props.secondLast) {
      return 0
    } else {
      return remcalc(72)
    }
  }}`};
`

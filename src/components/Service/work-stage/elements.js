import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../../styledLink'
import { Col } from 'react-styled-flexboxgrid'
import { H2 } from '../../Typography'

export const Item = styled.li`
  color: ${props => props.theme.colors.white};
  padding: ${remcalc(0)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  opacity: 0.5;

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

export const MasonryContainer = styled.div`
  ${breakpoint('desktop')`
    column-count: 2;
    column-gap: 0;
    column-fill: auto;
    height: ${props =>
    props.length % 2 !== 0 // when there's an odd number of elements we have to manually set the height because css
      ? remcalc(Math.ceil(props.length / 2) * 500)
      : 'auto'} 
    padding-bottom: ${remcalc(72)}
  `}
`

export const WorkStageGridElement = styled(Col)`
  padding-bottom: ${props => (props.index === props.last ? 0 : remcalc(72))};
  break-inside: avoid;

  ${breakpoint('desktop')`
    padding-bottom: ${props =>
    props.index === props.last ||
      (!props.evenNumber && props.index === props.halfway) ||
      (props.evenNumber && props.index + 1 === props.halfway)
      ? 0
      : remcalc(72)}}`};
`

export const WorkStageContentList = styled.div`
  list-style-position:inside;
  ${breakpoint('desktop')`
    width: 60%
  `}
`

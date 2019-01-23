import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../../styledLink'
import { SectionTitleH2 } from '../../Typography'

export const Item = styled.li`
  color: ${props => props.theme.colors.white};
  line-height: ${remcalc(24)};
  opacity: 0.5;
`

export const Graphic = styled.div`
  position: relative;
  top: ${remcalc(0)};
  height: 85%;
  width: ${remcalc(680)};
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);

  ${breakpoint('smallTablet')`
    max-width: 80%;
  `}
`

export const How = styled(SectionTitleH2)`
  position: relative;
  top: -71%;
  text-align: center;
`

export const SwitchLink = styled(StyledLink)`
  margin-bottom: ${remcalc(36)};
  opacity: ${props => (props.muted ? 0.5 : 1)};
  cursor: pointer;
  ${props => (props.muted ? 'border: none;' : '')};

  &:after {
    display: ${props => (props.muted ? 'none' : 'box')};
  }

  &:not(:last-child) {
    margin-right: ${remcalc(30)};
  }

  ${breakpoint('tablet')`
      margin-bottom: ${remcalc(72)};
  `}
`

export const WorkStageContentList = styled.ul`
  list-style-position: inside;
  ${breakpoint('desktop')`
    width: 60%
  `}
`

import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.li`
  position: relative;
  list-style: none;
  padding-top: ${remcalc(12)};
  padding-bottom: ${remcalc(21)};
  margin-bottom: ${remcalc(8)};
  line-height: ${remcalc(24)};
  max-width: ${remcalc(240)};

  ${is('symmetrical')`
    padding-top: ${remcalc(0)};
    padding-bottom: ${remcalc(30)};
    margin-bottom: ${remcalc(18)};
  `};

  ${is('spaced')`
    padding-top: ${remcalc(0)};
    padding-bottom: ${remcalc(47)};
    margin-bottom: ${remcalc(30)};
  `};

  ${is('fullWidth')`
    max-width: none;
  `};

  ${is('muted')`
    opacity: .5;
  `};

  &:after {
    content: '';
    width: ${remcalc(60)};
    height: ${remcalc(1)};
    background: ${props => props.theme.colors.grey};
    bottom: 0;
    display: block;
    position: absolute;
    max-width: ${remcalc(335)};

    ${is('fullWidthBorder')`
      width: 100%;
    `};

    ${is('fullWidth')`
      max-width: none;
    `};
  }

  & span {
    display: block;
    color: ${props => props.theme.colors.lightGrey};
  }
`

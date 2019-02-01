import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.li`
  position: relative;
  padding-top: ${remcalc(12)};
  padding-bottom: ${remcalc(21)};
  margin-bottom: ${remcalc(8)};
  line-height: ${remcalc(24)};

  ${is('symmetrical')`
    padding-top: ${remcalc(0)};
    padding-bottom: ${remcalc(30)};
    margin-bottom: ${remcalc(18)};
  `};

  ${is('big')`
    padding-top: ${remcalc(0)};
    padding-bottom: ${remcalc(47)};
    margin-bottom: ${remcalc(30)};
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

    ${is('fullWidth')`
      width: 100%;
    `};
  }

  & span {
    display: block;
    color: ${props => props.theme.colors.lightGrey};
  }
`

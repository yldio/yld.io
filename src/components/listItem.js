import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.li`
  position: relative;
  padding-bottom: ${remcalc(47)};
  margin-bottom: ${remcalc(30)};
  line-height: ${remcalc(24)};

  ${is('symmetrical')`
    padding-bottom: ${remcalc(30)};
    margin-bottom: ${remcalc(18)};
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

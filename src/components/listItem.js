import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.li`
  position: relative;
  padding-bottom: ${remcalc(30)};
  margin-bottom: ${remcalc(20)};
  line-height: ${remcalc(24)};

  &:after {
    content: '';
    width: ${remcalc(60)};
    height: ${remcalc(1)};
    background: ${props => props.theme.colors.grey};
    bottom: 0;
    display: block;
    position: absolute;
    ${is('fullWidthDivider')`
      width: 100%;
    `}
  }

  & span {
    display: block;
    color: ${props => props.theme.colors.lightGray};
  }
`

import styled from 'styled-components'
import remcalc from 'remcalc'

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
  }

  & span {
    display: block;
    color: ${props => props.theme.colors.lightGray};
  }
`

import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

// topOffset prop should be a negative number for overlapping
// the gray background

// offsetBottom is a boolean that defines that the offset
// is at the bottom of the section rather than the top

export default styled.section`
  background: ${props => props.theme.colors.greyBg};
  margin-top: ${props =>
    props.offsetBottom
      ? 0
      : remcalc((props.topOffset && props.topOffset * -1) || 50)};
  padding-top: ${props =>
    props.offsetBottom ? remcalc(props.topOffset * -1) : 0};
  margin-bottom: ${props => remcalc(props.topOffset || -50)};
  z-index: -2;
  position: relative;

  &:after {
    content: ' ';
    width: 100%;
    height: ${props => remcalc(props.topOffset ? props.topOffset * -1 : 50)};
    bottom: 0;
    background-color: white;
    display: block;
    position: absolute;
    z-index: -1;
  }

  ${is('noTop')`
    margin-top: ${remcalc(0)};
  `}

  > * {
    top: ${props => remcalc(props.topOffset || -50)};
    position: relative;

    ${is('noTop')`
      top: ${remcalc(0)};
    `}
  }
`

import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

// topOffset prop should be a negative number for overlapping
// the gray background
export default styled.section`
  background: ${props => props.theme.colors.greyBg};
  margin-top: ${props =>
    remcalc((props.topOffset && props.topOffset * -1) || 50)};
  margin-bottom: ${props => remcalc(props.topOffset || -50)};

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

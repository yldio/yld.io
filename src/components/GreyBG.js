import styled, { css } from 'styled-components'
import remcalc from 'remcalc'
import { isNot } from 'styled-is'
import breakpoint from 'styled-components-breakpoint'

// topOffset prop should be a negative number for overlapping
// the grey background

const afterStyles = css`
  content: ' ';
  width: 100%;
  bottom: 0;
  background-color: white;
  display: block;
  position: absolute;
  z-index: 2;
`

const PADDING = 50

export default styled.section`
  background: ${props => props.theme.colors.greyBG};

  z-index: 1;
  position: relative;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;

  ${breakpoint('smallTablet')`
    margin-top: ${({ topOffset }) =>
      remcalc((topOffset && topOffset * -1) || PADDING)};
    margin-bottom: ${({ topOffset }) => remcalc(topOffset || -PADDING)};
    &:after {
      ${afterStyles}
      height: ${({ topOffset }) =>
        remcalc(topOffset ? topOffset * -1 : PADDING)};
    }
  `}

  ${breakpoint('tablet')`
    margin-top: ${({ topOffset }) =>
      remcalc((topOffset && topOffset * -2) || PADDING)};
    margin-bottom: ${({ topOffset }) => remcalc(topOffset * 2 || -PADDING)};
    &:after {
      ${afterStyles}
      height: ${({ topOffset }) =>
        remcalc(topOffset ? topOffset * -2 : PADDING)};
    }
  `}


  ${isNot('topMargin')`
    padding-bottom: ${remcalc(PADDING)};
    &:after {
      content: none;
    }
  `}

  > * {
    ${breakpoint('smallTablet')`
      top: ${({ topOffset }) => remcalc(topOffset || -PADDING)};
      position: relative;

      ${isNot('topMargin')`
        top: 0;
      `};
    `}

    ${breakpoint('tablet')`
      top: ${({ topOffset }) => remcalc(topOffset * 2 || -PADDING)};
      position: relative;

      ${isNot('topMargin')`
        top: 0;
      `};
    `}
  }

  + * {
    z-index: 2;
    position: relative;
  }
`

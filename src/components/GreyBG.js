import styled, { css } from 'styled-components'
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

export default styled.section`
  background: ${props => props.theme.colors.greyBG};

  z-index: 1;
  position: relative;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;

  ${breakpoint('smallTablet')`
    &:after {
      ${afterStyles}
    }
  `}

  ${breakpoint('tablet')`
    &:after {
      ${afterStyles}
    }
  `}


  ${isNot('topMargin')`
    &:after {
      content: none;
    }
  `}

  > * {
    ${breakpoint('smallTablet')`
      position: relative;

      ${isNot('topMargin')`
        top: 0;
      `};
    `}

    ${breakpoint('tablet')`
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

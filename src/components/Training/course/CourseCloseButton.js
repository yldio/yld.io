import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import close from '../../../images/close.svg'

const Close = styled(Link)`
  border: none;
  border-radius: 50%;
  width: ${remcalc(54)};
  height: ${remcalc(54)};
  background-color: #333333;
  color: white;
  right: ${remcalc(24)};
  top: ${remcalc(36)};
  font-size: ${remcalc(28)};
  font-weight: 200;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

    &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.vibrant};
    color: ${props => props.theme.colors.text};
  }

  &:active {
    outline: none;
    background: #00edbf;
    color: ${props => props.theme.colors.text};

    &:after {
      background: ${props => props.theme.colors.text};
    }
  }

  ${breakpoint('smallTablet')`
    right: ${remcalc(42)};
  `}

  ${breakpoint('tablet')`
    right: ${remcalc(48)};
  `}

   ${breakpoint('desktop')`
    right: ${remcalc(90)};
  `}
`

const CourseCloseButton = ({ closeTo }) => (
  <Close to={closeTo}>
    <img src={close} alt="close modal" width="18" height="18" />
  </Close>
)

export default CourseCloseButton

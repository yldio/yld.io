import styled, { css } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'

const linkStyles = css`
  a {
    transition: all 300ms ease-out;
    opacity: 0.8;
    padding: ${remcalc(6)};

    &:not(:last-child) {
      margin-right: ${remcalc(18)};
    }

    &:active {
      background: ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.white};
    }

    &:hover {
      background: ${props => props.theme.colors.greyBg};
      color: ${props => props.theme.colors.text};
    }

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid #6be9c1;
      color: ${props => props.theme.colors.text};
    }

    &.active {
      opacity: 1;
    }
  }
`

export const MobileMenu = styled(Flex)`
  display: flex;
  position: absolute;
  right: ${remcalc(30)};
  cursor: pointer;
  padding: 0;
  margin: 0;

  ${breakpoint('tablet')`
    display: none;
  `};
`

export const HomeLink = styled(Padding)`
  display: block;

  ${breakpoint('tablet')`
    display: none;
  `};
`

export const Close = styled.button`
  position: absolute;
  top: ${remcalc(18)};
  right: ${remcalc(24)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};

  @media screen and (max-width: 768px) and (min-width: 600px) {
    top: ${remcalc(26)};
    right: ${remcalc(36)};
  }
`

export const DesktopMenu = styled(Flex)`
  opacity: 0;
  width: 0;
  transform: translateX(100%);
  transition: transform 300ms ease-out;

  ${breakpoint('tablet')`
    display: flex;
    width: auto;
    opacity: 1;
    transform: translateX(0%);

    ${linkStyles}
  `};

  ${is('open')`
    width: auto;
    opacity: 1;
    position: fixed;
    background: ${props => props.theme.colors.black};
    display: flex;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    flex-direction: column;
    padding: ${remcalc(24)};
    z-index: 999;
    transform: translateX(0%);
    justify-content: center;

    a {
      opacity: 0.5;
      font-size: ${remcalc(42)};
      font-weight: 500;
      line-height: 1.14;
      margin-bottom: ${remcalc(18)};
      transition: all 200ms ease;
      color: ${props => props.theme.colors.white};
      display: block;
      top: ${remcalc(-60)};

      &:hover, &.active {
        color: ${props => props.theme.colors.white};
        opacity: 1;
      }
    }

    @media screen and (max-width: 768px) and (min-width: 600px) {
      width: ${remcalc(295)};
      justify-content: flex-start;
      left: auto;
      right: 0;
      padding: ${remcalc(36)};
      z-index: 10;

      &:after {
          background-color: rgba(51, 51, 51, 0.2);
          content: '';
          display: block;
          position: fixed;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 1;
          transform: translateX(-100%);
      }

      a {
        top: ${remcalc(0)};
      }
    }
  `};
`

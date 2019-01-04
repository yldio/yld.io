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
    padding: ${remcalc(12)} ${remcalc(6)};
    background: linear-gradient(to right, #616161 0%, transparent 0);
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 48px;
      transition: all 300ms ease-out;
      width: 0;
      opacity: 0;
      background: ${props => props.theme.colors.greyBG};
      z-index: -1;
    }

    &:not(:last-child) {
      margin-right: ${remcalc(18)};
    }

    &:hover {
      color: ${props => props.theme.colors.text};

      @media (pointer: fine) {
        &:after {
          width: 100%;
          opacity: 1;
          transition: all 300ms ease-out;
        }
      }
    }

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid #6be9c1;
      color: ${props => props.theme.colors.text};
    }

    &:active {
      background: ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.white};
      outline: none;
    }

    &.active {
      opacity: 1;
    }
  }
`

export const MobileMenu = styled(Flex)`
  display: flex;
  cursor: pointer;
  padding: 0;
  margin: 0;

  button {
    border: none;
    background: transparent;
    padding: ${remcalc(8)} ${remcalc(6)};

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid #6be9c1;
      color: ${props => props.theme.colors.text};
    }
  }

  ${breakpoint('smallTablet')`
    display: none;


    button {
      display: none;
    }
  `};
`

export const HomeLink = styled(Padding)`
  display: block;

  ${breakpoint('smallTablet')`
    display: none;
  `};
`

export const Close = styled.button`
  position: absolute;
  top: ${remcalc(40)};
  right: ${remcalc(24)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};
  height: ${remcalc(32)};
  display: flex;

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid #6be9c1;
    color: ${props => props.theme.colors.text};
  }

  ${breakpoint('smallTablet')`
    display: none;
  `};

  @media screen and (max-width: 768px) and (min-width: 600px) {
    top: ${remcalc(40)};
    right: ${remcalc(36)};
  }
`

export const DesktopMenu = styled(Flex)`
  position: fixed;
  background: ${props => props.theme.colors.black};
  display: flex;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  flex-direction: column;
  padding: ${remcalc(24)};
  padding-right: ${remcalc(0)};
  padding-top: ${remcalc(12)};
  z-index: 999;
  transform: translateX(200%);
  transition: transform 200ms ease-out;

  ${breakpoint('smallTablet')`
    display: flex;
    width: auto;
    opacity: 1;
    transform: translateX(0%);
    height: auto;
    flex-direction: row;
    background: transparent;
    position: relative;

    ${linkStyles}
  `};

  ${is('open')`
    transform: translateX(0%);
    justify-content: center;
    transition: all 200ms ease-out;

    a {
      opacity: 0.5;
      font-size: ${remcalc(42)};
      font-weight: 500;
      line-height: 1.14;
      margin-bottom: ${remcalc(18)};
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

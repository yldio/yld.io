import React from 'react'
import styled, { css } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'

export const outlineStyles = css`
  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:active {
    outline: none;
  }
`
const linkStyles = css`
  a {
    transition: all ${props => props.theme.animations.normal} ease-out;
    padding: ${remcalc(10)} ${remcalc(6)} ${remcalc(14)};
    background: linear-gradient(to right, #616161 0%, transparent 0);
    position: relative;

    &:hover {
      color: ${props => props.theme.colors.text};

      @media (pointer: fine) {
        &:after {
          width: 100%;
          opacity: 1;
          transition: all ${props => props.theme.animations.normal} ease-out;
        }
      }
    }

    &:focus {
      outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
    }
  
    &:active {
      outline: none;
    }

    ${outlineStyles}

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
      outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
      color: ${props => props.theme.colors.text};
    }
  }

  ${breakpoint('tablet')`
    display: none;


    button {
      display: none;
    }
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
  min-width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  min-height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  top: ${remcalc(24)};
  right: ${remcalc(24)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};
  height: ${remcalc(32)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
    color: ${props => props.theme.colors.text};
  }

  ${breakpoint('tablet')`
    display: none;
  `};
`

export const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 768px) and (min-width: 600px) {
    z-index: 9;
    background-color: rgba(51, 51, 51, 0.2);
    content: '';
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    transition: opacity ${props => props.theme.animations.fast} ease-out;
    opacity: 0;
    transform: translateX(200%);

    ${is('visible')`
      transform: translateX(0);
      opacity: 1;
    `}
  }
`

const DesktopMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: ${remcalc(24)};
  padding-right: ${remcalc(0)};
  padding-top: ${remcalc(12)};
  justify-content: center;

  ${breakpoint('phone')`
    padding-bottom: ${remcalc(24)};
  `}

  ${breakpoint('tablet')`
    width: auto;
    height: auto;
    flex-direction: row;
    position: relative;

    > li:not(:last-child) {
      margin-right: ${remcalc(18)};
    }
  `};

  @media screen and (max-width: 768px) and (min-width: 600px) {
    padding: ${remcalc(36)};
    a {
      top: ${remcalc(0)};
    }
  }
`

const DesktopMenuContainer = styled(Flex).attrs({
  as: 'nav'
})`
  position: fixed;
  background: ${props => props.theme.colors.black};
  display: flex;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  flex-direction: column;
  z-index: ${props => props.theme.zIndexes.header};
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;
  justify-content: center;

  ${breakpoint('tablet')`
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

  @media screen and (max-width: 768px) and (min-width: 600px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
    a {
      top: ${remcalc(0)};
    }
  }

  ${is('open')`
    transform: translateX(0%);

    > a:last-of-type {
      margin-bottom: 0;
    }

    a {
      opacity: 0.5;
      font-size: ${remcalc(28)};
      font-weight: 500;
      line-height: 1.14;
      margin-bottom: ${remcalc(18)};
      color: ${props => props.theme.colors.white};
      display: block;

      ${breakpoint('phone')`
        font-size: ${remcalc(42)};
        top: ${remcalc(-60)};
      `}

      &:hover, &.active {
        color: ${props => props.theme.colors.white};
        opacity: 1;
      }
    }
  `};
`

export const DesktopMenu = ({ children, open }) => (
  <DesktopMenuContainer open={open}>
    <DesktopMenuList>{children}</DesktopMenuList>
  </DesktopMenuContainer>
)

export const DesktopMenuItem = styled.li`
  list-style-type: none;
  display: flex;
`

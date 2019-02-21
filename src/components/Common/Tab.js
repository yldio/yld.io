import React from 'react'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'
import { UnstyledButton } from './Button'
import { Subtitle } from '../Typography'

const TabContainer = styled.li`
  display: inline-block;

  /* Targetting the next sibling and add a margin to the left of it */
  & + & {
    margin-left: ${remcalc(36)};
  }
`

const Text = styled(Subtitle)`
  transition: opacity ${props => props.theme.animations.normal} ease-in-out;
  padding: ${remcalc(9)} 0 ${remcalc(34)};
`

const Underline = css`
  content: '';
  display: block;
  width: 100%;
  background: ${props => props.theme.colors.text};
  height: ${remcalc(2)};
  position: absolute;
  bottom: ${remcalc(22)};
  will-change: transform;
  transition: transform ${props => props.theme.animations.long} ease-in-out;
  left: 0;
  transform-origin: left;
  transform: scaleX(0);

  ${is('active')`
    transform: scaleX(1);
  `};
`

const Button = styled(UnstyledButton)`
  position: relative;

  &:active,
  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:after {
    ${Underline}
  }
`

const Tab = ({ active, onClick, children, as, ...props }) => (
  <TabContainer>
    <Button onClick={onClick} {...props} active={active}>
      <Text muted={!active} noPadding as={as}>
        {children}
      </Text>
    </Button>
  </TabContainer>
)

export const Tabs = ({ children, ...props }) => <ul {...props}>{children}</ul>

export default Tab

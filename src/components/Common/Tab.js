import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'
import UnstyledButton from './UnstyledButton'
import { Subtitle } from '../Typography'

const TabContainer = styled.li`
  display: inline-block;

  & + & {
    margin-left: ${remcalc(36)};
  }
`

const Text = styled(Subtitle)`
  transition: opacity ${props => props.theme.animations.normal} ease-in-out;
`

const Button = styled(UnstyledButton)`
  position: relative;

  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:active {
    outline: none;
  }
`

const ButtonContent = styled.div`
  padding: ${remcalc(9)} 0 ${remcalc(34)};
`

const Underline = styled.div`
  width: 100%;
  background: black;
  height: 2px;
  position: absolute;
  bottom: 22px;
  transition: transform ${props => props.theme.animations.long} ease-in-out;
  left: 0;
  transform-origin: left;
  transform: scaleX(0);

  ${is('active')`
    transform: scaleX(1);
  `};
`

const Tab = ({ active, onClick, children, ...props }) => (
  <TabContainer>
    <Button onClick={onClick} {...props}>
      <ButtonContent>
        <Text muted={!active} noPadding>
          {children}
        </Text>
        <Underline active={active} />
      </ButtonContent>
    </Button>
  </TabContainer>
)

export const Tabs = ({ children, ...props }) => <ul {...props}>{children}</ul>

export default Tab

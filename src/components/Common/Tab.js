import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import is from 'styled-is';
import { UnstyledButton } from './Button';
import { Subtitle } from '../Typography';

const TabContainer = styled.li`
  display: inline-block;
  margin-right: ${remcalc(28)};

  &:last-child {
    margin-right: 0;
  }

  ${breakpoint('phone')`
    margin-right: ${remcalc(36)};
  `}
`;

const Text = styled(Subtitle)`
  transition: opacity ${props => props.theme.animations.normal} ease-in-out;
  padding: ${remcalc(9)} 0 ${remcalc(34)};
`;

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

  ${is('current')`
    transform: scaleX(1);
  `};
`;

const Button = styled(UnstyledButton)`
  position: relative;
  outline: none;

  ${breakpoint('desktop')`
    &:active,
    &:focus {
      &:after {
        transform: scaleX(1);
      }
    }
  `}
  &:after {
    ${Underline}
  }
`;

const Tab = ({ current, onClick, children, as, ...props }) => (
  <TabContainer>
    <Button onClick={onClick} {...props} active={current}>
      <Text muted={!current} noPadding as={as}>
        {children}
      </Text>
    </Button>
  </TabContainer>
);

const StyledUl = styled.ul`
  /* Adding 4px margin for allowing tabs outline to be fully visible */
  margin: 4px;
`;

export const Tabs = ({ children, ...props }) => (
  <StyledUl {...props}>{children}</StyledUl>
);

export default Tab;

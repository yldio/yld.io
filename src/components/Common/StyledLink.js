import React from 'react';
import InternalAnchor from '../Common/InternalAnchor';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

export const underlinePseudoElement = css`
  content: '';
  display: block;
  height: ${remcalc(2)};
  width: 100%;
  margin-top: ${remcalc(6)};
  box-sizing: border-box;
`;

export const StyledLinkCss = css`
  padding: ${remcalc(8)} ${remcalc(6)};
  margin-top: ${remcalc(3)};
  margin-bottom: ${remcalc(24)};
  margin-left: ${remcalc(-6)};
  line-height: ${remcalc(24)};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  position: relative;
  display: inline-block;
  transition: all ${({ theme }) => theme.animations.fast} ease-out;
  transition-property: background, color;

  &:after {
    ${underlinePseudoElement}
    background: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.animations.fast} ease-out;
    transition-property: background;

    ${is('noafter')`
      content: none;
    `}

    ${is('reverse')`
      background: ${({ theme }) => theme.colors.white};
    `};

    ${is('muted')`
      background: ${({ theme }) => theme.colors.secondaryText};
    `};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.greyBg};
    color: ${({ theme }) => theme.colors.text};

    &:after {
      ${is('muted')`
        background: ${({ theme }) => theme.colors.text};
      `};
    }
  }

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${({ theme }) => theme.colors.vibrant};
    color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    outline: none;
    background: #00edbf;
    color: ${({ theme }) => theme.colors.text};

    &:after {
      background: ${({ theme }) => theme.colors.text};
    }
  }

  ${is('muted')`
    color: ${({ theme }) => theme.colors.secondaryText};
  `}

  ${is('reverse')`
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background: ${({ theme }) => theme.colors.text};
      color: ${({ theme }) => theme.colors.white};
    }

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid ${({ theme }) => theme.colors.vibrant};
      color: ${({ theme }) => theme.colors.white};
    }

    &:active {
      outline: none;
      background: #00edbf;
      color: ${({ theme }) => theme.colors.text};

      &:after {
        background: ${({ theme }) => theme.colors.text};
      }
    }
  `};

  ${is('vibrant', 'reverse')`
    &:hover {
      background-color: ${({ theme }) => theme.colors.vibrant}
      color: #007f56;

      &::after {
        background: #007f56
      }
    `}

  ${is('reverse', 'onDarkBg')`
    &:hover {
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => theme.colors.vibrant};
    }
  `}
`;

export const FakeLink = styled.p`
  ${StyledLinkCss}
`;

const Anchor = styled(InternalAnchor)`
  ${StyledLinkCss};
`;

const ExternalAnchor = styled(OutboundLink)`
  ${StyledLinkCss};
`;

const StyledLink = ({ external, to, href, children, ...props }) => {
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  if (to) {
    return (
      <Anchor {...externalProps} to={to} {...props}>
        {children}
      </Anchor>
    );
  }

  return (
    <ExternalAnchor {...externalProps} href={href} {...props}>
      {children}
    </ExternalAnchor>
  );
};

export default StyledLink;

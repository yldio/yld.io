import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

import Anchor from '../Common/Anchor'
import headerAnchorStyles from './headerAnchorStyles'

const TopNavAnchor = styled(Anchor)`
  ${headerAnchorStyles}
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
`

const TopNavListItem = styled.li`
  padding: ${remcalc(10)} ${remcalc(15)} ${remcalc(14)};
  &:last-child {
    padding-right: 0;
  }

  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 1;

  &:hover {
    background: ${props => props.theme.colors.greyBG};
    color: ${props => props.theme.colors.text};
  }

  &.active {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    opacity: 0.5;

    &:hover {
      background: ${props => props.theme.colors.text};
      color: #a9a9a9;
      opacity: 1;
    }
  }

  ${is('dark')`
    background: ${props => props.theme.colors.blueBg};
    color: ${props => props.theme.colors.white};
    opacity: 1;

    &:hover {
      background: ${props => props.theme.colors.blueBg};
      color: ${props => props.theme.colors.white};
      opacity: 0.2;
    }

    &.active {
      background: ${props => props.theme.colors.blueBg};
      color: ${props => props.theme.colors.white};
      opacity: 0.7;

      &:hover {
        background: #65ffcd;
        color: #007f56;
        opacity: 1;
      }
    }
  `}
`

const TopNavListAnchor = ({ children, to, href, dark, ...props }) => {
  console.log('now', children, dark)
  return (
    <TopNavListItem dark={dark} {...props}>
      <TopNavAnchor href={href} to={to}>
        {children}
      </TopNavAnchor>
    </TopNavListItem>
  )
}

export default TopNavListAnchor

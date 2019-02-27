import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { TopNavAnchor } from './HeaderAnchor'

const TopNavList = styled.ul`
  ${breakpoint('phone')`
    display: none;
  `}

  @media screen and (min-width: 960px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    padding: ${remcalc(20)} ${remcalc(0)} ${remcalc(16)};
    padding-right: ${remcalc(0)};
  }
`

export const TopNavListItem = styled.li`
  list-style-type: none;

  &:last-child > a {
    padding-right: 0;
  }
`

const TopNavbar = ({ links, blue }) => (
  <nav>
    <TopNavList>
      {links.map((link, idx) => (
        <TopNavListItem key={idx}>
          {link.isInternal ? (
            <TopNavAnchor dark={blue} activeClassName="active" to={link.path}>
              {link.text}
            </TopNavAnchor>
          ) : (
            <TopNavAnchor dark={blue} activeClassName="active" href={link.path}>
              {link.text}
            </TopNavAnchor>
          )}
        </TopNavListItem>
      ))}
    </TopNavList>
  </nav>
)
export default TopNavbar

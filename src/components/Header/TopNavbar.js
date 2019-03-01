import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import TopNavAnchor from './TopNavAnchor'
import Dropdown from './DesktopDropdown'

const TopNavList = styled.ul`
  ${breakpoint('phone')`
    display: none;
  `}

  @media screen and (min-width: 1010px) {
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

  padding: ${remcalc(10)} ${remcalc(15)} ${remcalc(14)};

  &:last-child {
    padding-right: 0;
  }
`

const TopNavbar = ({ links, dark }) => (
  <nav>
    <TopNavList>
      {links.map((link, idx) => {
        if (link.dropdownItems) {
          const { label, dropdownItems } = link
          return (
            <Dropdown
              key={idx}
              themeVariation={dark ? 'dark' : 'light'}
              items={dropdownItems}
            >
              {label}
            </Dropdown>
          )
        } else {
          const { label, to, href } = link
          return (
            <TopNavListItem key={idx}>
              <TopNavAnchor activeClassName="active" to={to} href={href}>
                {label}
              </TopNavAnchor>
            </TopNavListItem>
          )
        }
      })}
    </TopNavList>
  </nav>
)
export default TopNavbar

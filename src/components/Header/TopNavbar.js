import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import TopNavAnchorItem from './TopNavAnchorItem'
import Dropdown from './Dropdown'

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
          console.log(label, dark)
          return (
            <TopNavAnchorItem
              key={idx}
              themeVariation={dark ? 'dark' : 'light'}
              activeClassName="active"
              to={to}
              href={href}
            >
              {label}
            </TopNavAnchorItem>
          )
        }
      })}
    </TopNavList>
  </nav>
)
export default TopNavbar

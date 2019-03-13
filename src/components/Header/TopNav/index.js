import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import OuterAnchorItem from './OuterAnchorItem'
import Dropdown from './Dropdown'

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

const TopNav = ({ links, themeVariation }) => (
  <nav>
    <TopNavList>
      {links.map((link, idx) => {
        if (link.dropdownItems) {
          const { label, dropdownItems } = link
          return (
            <Dropdown
              key={idx}
              themeVariation={themeVariation}
              items={dropdownItems}
            >
              {label}
            </Dropdown>
          )
        } else {
          const { label, to, href } = link
          return (
            <OuterAnchorItem
              key={idx}
              themeVariation={themeVariation}
              activeClassName="active"
              to={to}
              href={href}
            >
              {label}
            </OuterAnchorItem>
          )
        }
      })}
    </TopNavList>
  </nav>
)

export default TopNav

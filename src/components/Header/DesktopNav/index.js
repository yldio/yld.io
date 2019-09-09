import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import OuterAnchorItem from './OuterAnchorItem'
import Dropdown from './Dropdown'
import links from '../utils/navLinks'
import generate from 'shortid'

const TopNavList = styled.ul`
  ${breakpoint('smallPhone')`
    display: none;
  `}

  @media screen and (min-width: 960px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: ${remcalc(20)} ${remcalc(0)} ${remcalc(16)};
  }
`

const TopNav = ({ themeVariation }) => (
  <TopNavList>
    {links.map(({ label, dropdownItems, attributes, to, href }) =>
      dropdownItems && dropdownItems.length > 0 ? (
        <Dropdown
          key={generate()}
          themeVariation={themeVariation}
          items={dropdownItems}
          dataEvent={
            attributes && attributes.dataEvent ? attributes.dataEvent : null
          }
        >
          {label}
        </Dropdown>
      ) : (
        <OuterAnchorItem
          key={generate()}
          themeVariation={themeVariation}
          activeClassName="active"
          to={to}
          href={href}
          title={label}
          attributes={attributes}
        >
          {label}
        </OuterAnchorItem>
      )
    )}
  </TopNavList>
)

export default TopNav

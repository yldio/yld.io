import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import generate from 'shortid'

import LogoLink from './LogoLink'
import ServiceLink from './ServiceLink'
import OuterAnchorItem from './OuterAnchorItem'
import Dropdown from './Dropdown'

const StyledTopNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${remcalc(84)};
`

const StyledLinksContainer = styled.div`
  display: flex;
  align-items: center;
`

const TopNavList = styled.ul`
  ${breakpoint('smallPhone')`
    display: none;
  `}

  @media screen and (min-width: 960px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: ${remcalc(20)} ${remcalc(0)} ${remcalc(16)};
    padding-right: ${remcalc(0)};
  }
`

const TopNav = ({ links, themeVariation, path }) => (
  <StyledTopNavContainer>
    <StyledLinksContainer>
      <LogoLink path={path} />
      <ServiceLink path={path} />
    </StyledLinksContainer>
    <TopNavList>
      {links &&
        links.map(link => {
          if (link.dropdownItems) {
            const { label, dropdownItems } = link
            return (
              <Dropdown
                key={generate()}
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
                key={generate()}
                themeVariation={themeVariation}
                activeClassName="active"
                to={to}
                href={href}
                label={label}
              />
            )
          }
        })}
    </TopNavList>
  </StyledTopNavContainer>
)

export default TopNav

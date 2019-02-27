import React, { Fragment } from 'react'
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

  &:last-child > a {
    padding-right: 0;
  }
`

const TopNavAnchorFromProps = ({ text, path, isInternal }) => (
  <Fragment>
    {isInternal ? (
      <TopNavAnchor activeClassName="active" to={path}>
        {text}
      </TopNavAnchor>
    ) : (
      <TopNavAnchor activeClassName="active" href={path}>
        {text}
      </TopNavAnchor>
    )}
  </Fragment>
)

const TopNavbar = ({ links, dark }) => (
  <nav>
    <TopNavList>
      {links.map((link, idx) => (
        <Fragment key={idx}>
          {link.dropdownItems ? (
            <Dropdown
              themeVariation={dark ? 'dark' : 'light'}
              items={link.dropdownItems}
            >
              {link.text}
            </Dropdown>
          ) : (
            <TopNavListItem>
              <TopNavAnchorFromProps
                text={link.text}
                path={link.path}
                isInternal={link.isInternal}
              />
            </TopNavListItem>
          )}
        </Fragment>
      ))}
    </TopNavList>
  </nav>
)
export default TopNavbar

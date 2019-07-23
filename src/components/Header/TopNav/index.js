import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { StaticQuery, graphql } from 'gatsby'
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

const getSlugs = (arr = []) => arr.map(({ slug }) => slug).filter(i => i)

const TopNavBranding = ({ path, slug }) => (
  <StaticQuery
    query={graphql`
      {
        services: allContentfulService {
          nodes {
            slug
          }
        }
        specialities: allContentfulSpeciality {
          nodes {
            slug
          }
        }
      }
    `}
    render={({ services, specialities }) => {
      const serviceSlugs = getSlugs(services.nodes)
      const specialitySlugs = getSlugs(specialities.nodes)

      const isServicePage = serviceSlugs.includes(slug) || slug === 'training'
      const isSpecialityPage = specialitySlugs.includes(slug)
      const isHomePage = path === '/'

      return (
        <StyledLinksContainer>
          <LogoLink
            isSpecialityPage={isSpecialityPage}
            isServicePage={isServicePage}
            isHomePage={isHomePage}
            path={path}
            slug={slug}
          />
          <ServiceLink
            isSpecialityPage={isSpecialityPage}
            isServicePage={isServicePage}
            slug={slug}
            path={path}
          />
        </StyledLinksContainer>
      )
    }}
  />
)

const TopNav = ({ links, themeVariation, path, slug }) => (
  <StyledTopNavContainer>
    <TopNavBranding slug={slug} path={path} />
    <TopNavList>
      {links.map((link, idx) => {
        if (link.dropdownItems) {
          const { label, dropdownItems, attributes } = link
          return (
            <Dropdown
              key={idx}
              themeVariation={themeVariation}
              items={dropdownItems}
              dataEvent={attributes ? attributes.dataEvent : null}
            >
              {label}
            </Dropdown>
          )
        } else {
          const { label, to, href, attributes } = link
          return (
            <OuterAnchorItem
              key={idx}
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
        }
      })}
    </TopNavList>
  </StyledTopNavContainer>
)

export default TopNav

import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import find from 'lodash.find'
import { StaticQuery, graphql } from 'gatsby'

import LogoLink from './LogoLink'
import ServiceLink from './ServiceLink'
import OuterAnchorItem from './OuterAnchorItem'
import Dropdown from './Dropdown'
import { logoColors } from '../navLinksHelper'

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

const getColour = (arr, slug) => find((arr, { slug }) || {}).logoColour

const getSpecialitiesToServices = (services = []) =>
  services.reduce((acc, { slug, ...rest }) => {
    const {
      specialityAreaItems1,
      specialityAreaItems2,
      specialityAreaItems3,
      specialityAreaItems4
    } = rest

    const areas = [
      ...specialityAreaItems1,
      ...specialityAreaItems2,
      ...specialityAreaItems3,
      ...specialityAreaItems4
    ].filter(i => i)

    return {
      ...acc,
      [slug]: areas.map(({ slug }) => slug)
    }
  }, {})

const getService = ({ slug, map = [] }) =>
  Object.keys(map).find(key => map[key].includes(slug))

const TopNavBranding = ({ path, slug }) => (
  <StaticQuery
    query={graphql`
      {
        services: allContentfulService {
          nodes {
            slug
            specialityAreaItems1 {
              id
              slug
              title
            }
            specialityAreaItems2 {
              id
              slug
              title
            }
            specialityAreaItems3 {
              id
              slug
              title
            }
            specialityAreaItems4 {
              id
              slug
              title
            }
          }
        }
        specialities: allContentfulSpeciality {
          nodes {
            slug
            logoColour
          }
        }
      }
    `}
    render={({ services, specialities }) => {
      const serviceSlugs = getSlugs(services.nodes)
      const specialitySlugs = getSlugs(specialities.nodes)
      const specialitiesToServicesMap = getSpecialitiesToServices(
        services.nodes
      )

      const isServicePage = serviceSlugs.includes(slug)
      const isSpecialityPage = specialitySlugs.includes(slug)
      const isHomePage = path === '/'

      const service = isServicePage
        ? slug
        : getService({ slug, map: specialitiesToServicesMap })

      const fillColorInitial = isSpecialityPage
        ? getColour(specialities.nodes, slug) ||
          logoColors.specialitiesFillDefault
        : logoColors['default']

      const fillColorHover =
        logoColors[isSpecialityPage ? 'specialityHover' : 'defaultHover']

      const textColor =
        logoColors[isSpecialityPage ? 'specialityText' : 'defaultText']

      return (
        <StyledLinksContainer>
          <LogoLink
            isHomePage={isHomePage}
            isServiceOrSpecialityPage={isServicePage || isSpecialityPage}
            fillColorInitial={fillColorInitial}
            fillColorHover={fillColorHover}
            textColor={textColor}
          />
          <ServiceLink
            isSpecialityPage={isSpecialityPage}
            isServicePage={isServicePage}
            service={service}
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

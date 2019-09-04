import React from 'react'
import styled from 'styled-components'
import find from 'lodash.find'
import { StaticQuery, graphql } from 'gatsby'

import LogoLink from './DesktopNav/LogoLink'
import ServiceLink from './DesktopNav/ServiceLink'
import { logoColors } from './utils/navLinksHelper'

const StyledLinksContainer = styled.div`
  display: flex;
  align-items: center;
`

const getSlugs = (arr = []) => arr.map(({ slug }) => slug).filter(i => i)
const getColour = (arr, slug) => (find(arr, { slug }) || {}).logoColour

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
      const isHomeOrEventsPage = path === '/' || path.includes('events')

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
            isHomePage={isHomeOrEventsPage}
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

export default TopNavBranding

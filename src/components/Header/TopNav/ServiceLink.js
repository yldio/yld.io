import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { capitalize } from 'lodash'

import { specialitiesMap } from '../navLinksHelper'

const StyledServiceLink = styled(Link)`
  font-size: ${remcalc(26)};
  margin-left: ${remcalc(12)};
  color: ${props => props.theme.colors[props.color]};

  @media screen and (min-width: 960px) {
    font-size: ${remcalc(30)};
  }

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors[props.color]};
  }
`

const getServiceFromSlug = slug =>
  Object.keys(specialitiesMap).find(speciality =>
    specialitiesMap[speciality].includes(slug)
  )

const ServiceLink = ({ slug, isServicePage, isSpecialityPage }) => {
  const service = isServicePage ? slug : getServiceFromSlug(slug)

  return isServicePage || isSpecialityPage ? (
    <StyledServiceLink
      to={`/${service}`}
      title={service}
      color={isServicePage ? 'text' : 'white'}
    >
      {capitalize(service)}
    </StyledServiceLink>
  ) : null
}

export default ServiceLink

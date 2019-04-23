import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { capitalize } from 'lodash'

import { servicesRegExp, getSpecialityService } from './ServicesSpecialitiesMap'

const StyledServiceLink = styled(Link)`
  font-size: ${remcalc(26)};
  margin-left: ${remcalc(12)};

  @media screen and (min-width: 960px) {
    font-size: ${remcalc(30)};
  }

  &:hover {
    text-decoration: underline;
    color: ${props => props.hoverColor};
  }
`

const ServiceLink = ({ path = '/' }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null

  const isSpecialityPage = path.includes('speciality')
  const service = isSpecialityPage ? getSpecialityService(path) : serviceTitle

  return (
    <Fragment>
      {isServicePage || isSpecialityPage ? (
        <StyledServiceLink
          to={`/${service}`}
          hoverColor={isServicePage ? 'black' : 'white'}
        >
          {capitalize(service)}
        </StyledServiceLink>
      ) : null}
    </Fragment>
  )
}

export default ServiceLink

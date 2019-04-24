import React, { Fragment, useState } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'

import logo from '../../../images/logo_animated.gif'
import ServiceSpecialityLogoLink from '../../../images/service-speciality-logo-link'
import {
  servicesRegExp,
  servicesColors,
  getSpecialityService
} from './ServicesSpecialitiesMap'

const StyledLink = styled(Link)`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  @media screen and (min-width: 960px) {
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  }
`

const LogoLink = ({ path = '/' }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const isSpecialityPage = path.includes('speciality')

  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null
  const service = isSpecialityPage ? getSpecialityService(path) : serviceTitle

  const originalFillColor = isSpecialityPage ? servicesColors[service] : 'black'
  const [fillColor, setFillColor] = useState(originalFillColor)

  return (
    <Fragment>
      {isSpecialityPage || isServicePage ? (
        <StyledLink
          to="/"
          onMouseEnter={() => setFillColor(isServicePage ? '#8e8e8e' : 'white')}
          onMouseLeave={() => setFillColor(originalFillColor)}
        >
          <ServiceSpecialityLogoLink
            fillColor={fillColor}
            textColor={isSpecialityPage ? '#090329' : 'white'}
          />
        </StyledLink>
      ) : (
        <Link to="/">
          <img role="link" height="48" src={logo} alt="yld logo" />
        </Link>
      )}
    </Fragment>
  )
}

export default LogoLink

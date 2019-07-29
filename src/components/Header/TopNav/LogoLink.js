import React, { Fragment, useState } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'

import logo from '../../../images/logo_animated.gif'
import ServiceSpecialityLogo from '../../../images/service-speciality-logo'
import {
  servicesRegExp,
  logoColors,
  getSpeciality,
  getIsServicePage,
  getService
} from '../navLinksHelper'

const StyledLink = styled(Link)`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  @media screen and (min-width: 960px) {
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  }
`

const LogoLink = ({ path = '/' }) => {
  const isServicePage = getIsServicePage(path)
  const isSpecialityPage = path.includes('speciality')

  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null
  const service = isSpecialityPage ? getService(path) : serviceTitle
  const speciality = isSpecialityPage ? getSpeciality(path) : null

  let metaFillColor = '#fff'

  if (isServicePage) {
    metaFillColor = logoColors['default']
  }
  if (isSpecialityPage && logoColors[service][speciality]) {
    metaFillColor = logoColors[service][speciality]
  }

  const [fillColor, setFillColor] = useState(metaFillColor)

  return (
    <Fragment>
      {isSpecialityPage || isServicePage ? (
        <StyledLink
          to="/"
          title="Return to Homepage"
          onMouseEnter={() =>
            setFillColor(
              logoColors[isServicePage ? 'defaultHover' : 'specialityHover']
            )
          }
          onMouseLeave={() => setFillColor(metaFillColor)}
        >
          <ServiceSpecialityLogo
            fillColor={fillColor}
            textColor={
              logoColors[isServicePage ? 'defaultText' : 'specialityText']
            }
          />
        </StyledLink>
      ) : (
        <Link to="/" title="Return to Homepage">
          <img role="link" height="48" src={logo} alt="yld logo" />
        </Link>
      )}
    </Fragment>
  )
}

export default LogoLink

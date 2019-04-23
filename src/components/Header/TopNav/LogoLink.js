import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import logo from '../../../images/logo_animated.gif'
import ServiceSpecialityLogoLink from '../../../images/service-speciality-logo-link'
import { servicesRegExp } from './ServicesSpecialitiesMap'

const LogoLink = ({ path = '/' }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const isSpecialityPage = path.includes('speciality')

  return (
    <Fragment>
      {isSpecialityPage || isServicePage ? (
        <ServiceSpecialityLogoLink
          backgroundColor={isSpecialityPage ? '#52FFAC' : null}
          textColor={isSpecialityPage ? '#090329' : null}
          hoverBackgroundColor={isSpecialityPage ? '#FFFFFF' : null}
        />
      ) : (
        <Link to="/">
          <img role="link" height="48" src={logo} alt="yld logo" />
        </Link>
      )}
    </Fragment>
  )
}

export default LogoLink

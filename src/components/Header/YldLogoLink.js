import React from 'react'
import { Link } from 'gatsby'

import logo from '../../images/logo_animated.gif'
import ServiceSpecialityLogo from '../../images/service-speciality-logo-component'

const servicesList = [
  'engineering',
  'design',
  'training',
  'delivery',
  'dedicatedTeams',
  'openSource'
]

const servicesRegExp = new RegExp(servicesList.join('|'))

const YldLogoLink = ({ path }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const isSpecialityPage = path.includes('speciality')

  return (
    <Link to="/">
      {isSpecialityPage || isServicePage ? (
        <ServiceSpecialityLogo
          backgroundColor={isSpecialityPage ? '#52FFAC' : null}
          textColor={isSpecialityPage ? '#090329' : null}
          hoverBackgroundColor={isSpecialityPage ? '#FFFFFF' : null}
        />
      ) : (
        <img role="link" height="48" src={logo} alt="yld logo" />
      )}
    </Link>
  )
}

export default YldLogoLink

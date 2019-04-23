import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'

import logo from '../../../images/logo_animated.gif'
import ServiceSpecialityLogo from '../../../images/service-speciality-logo-component'
import { servicesRegExp } from './ServicesSpecialitiesMap'

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

  return (
    <StyledLink to="/">
      {isSpecialityPage || isServicePage ? (
        <ServiceSpecialityLogo
          backgroundColor={isSpecialityPage ? '#52FFAC' : null}
          textColor={isSpecialityPage ? '#090329' : null}
          hoverBackgroundColor={isSpecialityPage ? '#FFFFFF' : null}
        />
      ) : (
        <img role="link" height="48" src={logo} alt="yld logo" />
      )}
    </StyledLink>
  )
}

export default LogoLink

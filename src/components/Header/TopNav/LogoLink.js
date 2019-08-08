import React, { useState } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'

import logo from '../../../images/logo_animated.gif'
import HomepageSvg from '../../../images/yld-white.svg'
import ServiceSpecialityLogo from '../../../images/service-speciality-logo'

import { logoColors } from '../navLinksHelper'

const StyledLink = styled(Link)`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  @media screen and (min-width: 960px) {
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  }
`
const HomepageLogo = styled.img`
  width: 49px;
  height: 36px;
  margin-top: ${remcalc(6)};
`

const getLogoColors = ({ isSpecialityPage, slug }) => {
  // This isn't very nice I know...
  // In reality the specialitiesFills shouldn't be in the code
  // but in contentful. If the content type doesn't have a fill hex
  // set in the CMS then just fallback to white.
  const fillColorInitial = isSpecialityPage
    ? logoColors.specialitiesFills[slug] || logoColors.specialitiesFills.default
    : logoColors['default']

  const fillColorHover =
    logoColors[isSpecialityPage ? 'specialityHover' : 'defaultHover']

  const textColor =
    logoColors[isSpecialityPage ? 'specialityText' : 'defaultText']

  return {
    fillColorInitial,
    fillColorHover,
    textColor
  }
}

const LogoLink = ({ slug, isServicePage, isSpecialityPage, isHomePage }) => {
  const renderSvg = isServicePage || isSpecialityPage || isHomePage

  const { fillColorInitial, fillColorHover, textColor } = getLogoColors({
    isSpecialityPage,
    slug
  })

  const [fillColor, setFillColor] = useState(fillColorInitial)

  if (renderSvg) {
    return isServicePage || isSpecialityPage ? (
      <StyledLink
        to="/"
        title="Return to Homepage"
        onMouseEnter={() => setFillColor(fillColorHover)}
        onMouseLeave={() => setFillColor(fillColorInitial)}
      >
        <ServiceSpecialityLogo fillColor={fillColor} textColor={textColor} />
      </StyledLink>
    ) : (
      <Link to="/" title="Return to Homepage">
        <HomepageLogo src={HomepageSvg} alt="yld logo" />
      </Link>
    )
  }

  return (
    <Link to="/" title="Return to Homepage">
      <img role="link" height="48" src={logo} alt="yld logo" />
    </Link>
  )
}

export default LogoLink

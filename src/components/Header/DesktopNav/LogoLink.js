import React, { useState } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'

import logo from '../../../images/logo_animated.gif'
import HomepageSvg from '../../../images/yld-white.svg'
import ServiceSpecialityLogo from '../../../images/service-speciality-logo'

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

const StyledHomePageLink = styled.div`
  cursor: pointer;
`

const LogoLink = ({
  isHomePage,
  isServiceOrSpecialityPage,
  fillColorInitial,
  fillColorHover,
  textColor
}) => {
  const isSvgLogo = isServiceOrSpecialityPage || isHomePage
  const [fillColor, setFillColor] = useState(fillColorInitial)

  if (isSvgLogo) {
    return isServiceOrSpecialityPage ? (
      <StyledLink
        to="/"
        title="Return to Homepage"
        onMouseEnter={() => setFillColor(fillColorHover)}
        onMouseLeave={() => setFillColor(fillColorInitial)}
      >
        <ServiceSpecialityLogo fillColor={fillColor} textColor={textColor} />
      </StyledLink>
    ) : (
      <StyledHomePageLink onClick={() => window.scrollTo(0, 0)}>
        <HomepageLogo src={HomepageSvg} alt="yld logo" />
      </StyledHomePageLink>
    )
  }

  return (
    <Link to="/" title="Return to Homepage">
      <img role="link" width="49" src={logo} alt="yld logo" />
    </Link>
  )
}

export default LogoLink

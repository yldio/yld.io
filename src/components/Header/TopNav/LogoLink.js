import React, { Fragment, useState } from 'react'
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

const LogoLink = ({ slug, isServicePage, isSpecialityPage, isHomePage }) => {
  const renderSvg = isServicePage || isSpecialityPage || isHomePage

  const fillColorInitial = logoColors[slug] || logoColors['default']

  const fillColorHover = isSpecialityPage
    ? logoColors.specialityHover
    : logoColors.defaultHover

  const textColor = isSpecialityPage
    ? logoColors['specialityText']
    : logoColors['defaultText']

  const [fillColor, setFillColor] = useState(fillColorInitial)

  return (
    <Fragment>
      {renderSvg ? (
        isServicePage || isSpecialityPage ? (
          <StyledLink
            to="/"
            title="Return to Homepage"
            onMouseEnter={() => setFillColor(fillColorHover)}
            onMouseLeave={() => setFillColor(fillColorInitial)}
          >
            <ServiceSpecialityLogo
              fillColor={fillColor}
              textColor={textColor}
            />
          </StyledLink>
        ) : (
          <HomepageLogo src={HomepageSvg} alt="yld logo" />
        )
      ) : (
        <Link to="/" title="Return to Homepage">
          <img role="link" height="48" src={logo} alt="yld logo" />
        </Link>
      )}
    </Fragment>
  )
}

export default LogoLink

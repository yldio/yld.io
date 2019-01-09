import React, { Fragment } from 'react'
import styled from 'styled-components'
import logo from '../../images/logo_animated.gif'
import logoDesign from '../../images/design-logo.svg'
import LogoEngComponent from '../../images/eng-logo-component'
const HiddenText = styled.h1`
  position: absolute;
  top: -9999px;
  left: -9999px;
`

const Logo = ({ path, logoColour, blue }) => (
  <Fragment>
    {!path.includes('engineering') &&
    !path.includes('design') &&
    !path.includes('training') ? (
      <img role="link" tab-index="0" height="48" src={logo} alt="yld logo" />
    ) : null}

    {path.includes('engineering') || path.includes('training') ? (
      <Fragment>
        <HiddenText>engineering</HiddenText>
        <LogoEngComponent boxColour={logoColour} backgroundBlue={blue} />
      </Fragment>
    ) : null}

    {path.includes('design') ? (
      <Fragment>
        <HiddenText>Design</HiddenText>
        <img
          role="link"
          tab-index="0"
          height="48"
          src={logoDesign}
          alt="yld design logo"
        />
      </Fragment>
    ) : null}
  </Fragment>
)

export default Logo

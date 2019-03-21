import React, { Fragment } from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import logo from '../../images/logo_animated.gif'
import logoDesign from '../../images/design-logo.svg'
import LogoEngComponent from '../../images/eng-logo-component'
import logoTraining from '../../images/training-logo.svg'

const HiddenText = styled.h1`
  position: absolute;
  top: -9999px;
  left: -9999px;
`

const YLDLogoImageWrapper = styled.div`
  padding-top: ${remcalc('25')};
  padding-bottom: ${remcalc('23')};
`

const Logo = ({ path, logoColour, blue }) => {
  const name = path.split('/').join('')
  return (
    <Fragment>
      {!path.includes('engineering') &&
      !path.includes('design') &&
      !path.includes('training') &&
      !blue ? (
        <YLDLogoImageWrapper>
          <img role="link" height="36" src={logo} alt="yld logo" />
        </YLDLogoImageWrapper>
      ) : null}

      {path.includes('engineering') || blue ? (
        <Fragment>
          <HiddenText>{name}</HiddenText>
          <LogoEngComponent
            style={{ display: 'block' }}
            boxColour={logoColour}
            backgroundBlue={blue}
          />
        </Fragment>
      ) : null}

      {path.includes('training') ? (
        <Fragment>
          <HiddenText>{name}</HiddenText>
          <img
            role="link"
            height="48"
            src={logoTraining}
            alt="yld training logo"
            style={{ display: 'block' }}
          />
        </Fragment>
      ) : null}

      {path.includes('design') ? (
        <Fragment>
          <HiddenText>{name}</HiddenText>
          <img
            role="link"
            height="48"
            src={logoDesign}
            alt="yld design logo"
            style={{ display: 'block' }}
          />
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default Logo

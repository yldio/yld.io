import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import outlineStyles from './outlineStyles'
import logo from '../../images/logo_animated.gif'
import logoDesign from '../../images/design-logo.svg'
import LogoEngComponent from '../../images/eng-logo-component'
import logoTraining from '../../images/training-logo.svg'

const HiddenText = styled.h1`
  position: absolute;
  top: -9999px;
  left: -9999px;
`

const StyledLink = styled(Link)`
  ${outlineStyles}
`

const Logo = ({ path, logoColour, blue }) => {
  const name = path.split('/').join('')
  return (
    <Fragment>
      {!path.includes('engineering') &&
      !path.includes('design') &&
      !path.includes('training') &&
      !blue ? (
        <StyledLink to="/">
          <img role="link" height="48" src={logo} alt="yld logo" />
        </StyledLink>
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

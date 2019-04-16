import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import outlineStyles from './outlineStyles'
import logo from '../../images/logo_animated.gif'
// import logoDesign from '../../images/design-logo.svg'
// import LogoEngComponent from '../../images/eng-logo-component'
// import logoTraining from '../../images/training-logo.svg'

// const HiddenText = styled.h1`
//   position: absolute;
//   top: -9999px;
//   left: -9999px;
// `

const StyledLink = styled(Link)`
  ${outlineStyles}
`

const Logo = ({ path, logoColour, blue }) => {
  // const name = path.split('/').join('')
  return (
    <Fragment>
      <StyledLink to="/">
        <img role="link" height="48" src={logo} alt="yld logo" />
      </StyledLink>

      {path.includes('engineering') || blue ? (
        <Link to="/engineering">Link to engineering</Link>
      ) // <Fragment>
      //   <HiddenText>{name}</HiddenText>
      //   <LogoEngComponent
      //     style={{ display: 'block' }}
      //     boxColour={logoColour}
      //     backgroundBlue={blue}
      //   />
      // </Fragment>
      : null}

      {path.includes('training') ? (
        <Link to="/training">Link to training</Link>
      ) // <Fragment>
      //   <HiddenText>{name}</HiddenText>
      //   <img
      //     role="link"
      //     height="48"
      //     src={logoTraining}
      //     alt="yld training logo"
      //     style={{ display: 'block' }}
      //   />
      // </Fragment>
      : null}

      {path.includes('design') ? (
        <Link to="/design">Link to design</Link>
      ) // <Fragment>
      //   <HiddenText>{name}</HiddenText>
      //   <img
      //     role="link"
      //     height="48"
      //     src={logoDesign}
      //     alt="yld design logo"
      //     style={{ display: 'block' }}
      //   />
      // </Fragment>
      : null}
    </Fragment>
  )
}

export default Logo

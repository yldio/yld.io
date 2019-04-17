import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { capitalize } from 'lodash'

import outlineStyles from './outlineStyles'
import logo from '../../images/logo_animated.gif'
import ServiceSpecialityLogo from '../../images/service-speciality-logo-component'

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

const styledService = `
position: absolute;
font-size: 30px;
top: 20px;
left: 100px;
`

const StyledServiceLink = styled(Link)`
  ${styledService}
`

const StyledServiceTitle = styled.div`
  ${styledService}
`

const specialitiesMap = {
  engineering: ['node-js', 'graphql', 'vue-js', 'react-js', 'kubernetes'],
  design: [],
  training: [],
  delivery: [],
  dedicatedTeams: [],
  openSource: []
}

const servicesList = Object.keys(specialitiesMap)
const servicesRegExp = new RegExp(servicesList.join('|'))

const getSpecialityService = path =>
  servicesList.find(service => {
    const specialitiesRegExp = new RegExp(specialitiesMap[service].join('|'))
    return path.search(specialitiesRegExp) > -1
  })

const Logo = ({ path, logoColour, blue }) => {
  // const name = path.split('/').join('')
  const isServicePage = path.search(servicesRegExp) > -1
  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null

  const isSpecialityPage = path.includes('speciality')
  const specialityService = isSpecialityPage ? getSpecialityService(path) : null

  return (
    <Fragment>
      <StyledLink to="/">
        {isSpecialityPage || isServicePage ? (
          <ServiceSpecialityLogo />
        ) : (
          <img role="link" height="48" src={logo} alt="yld logo" />
        )}
      </StyledLink>

      {isServicePage ? (
        <StyledServiceTitle>{capitalize(serviceTitle)}</StyledServiceTitle>
      ) : null}

      {isSpecialityPage || blue ? (
        <StyledServiceLink to={`/${specialityService}`}>
          {capitalize(specialityService)}
        </StyledServiceLink>
      ) : null}

      {/* {path.includes('engineering') ? (
        <StyledServiceLink to="/engineering">Enw</StyledServiceLink>
      ) : null// <Fragment>
      //   <HiddenText>{name}</HiddenText>
      //   <LogoEngComponent
      //     style={{ display: 'block' }}
      //     boxColour={logoColour}
      //     backgroundBlue={blue}
      //   />
      // </Fragment>
      : null}

      {path.includes('training') ? (
        <StyledServiceLink to="/training">Training</StyledServiceLink>
      ) // <Fragment>
      //   <HiddenText>{name}</HiddenText>
      //   <img
      //     role="StyledServiceLink"
      //     height="48"
      //     src={logoTraining}
      //     alt="yld training logo"
      //     style={{ display: 'block' }}
      //   />
      // </Fragment>
      : null}

      {path.includes('design') ? (
        <StyledServiceLink to="/design">Design</StyledServiceLink>
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
      null} */}
    </Fragment>
  )
}

export default Logo

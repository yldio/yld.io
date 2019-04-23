import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'

import logo from '../../../images/logo_animated.gif'
import ServiceSpecialityLogoLink from '../../../images/service-speciality-logo-link'
import {
  servicesRegExp,
  servicesColors,
  getSpecialityService
} from './ServicesSpecialitiesMap'

const StyledLink = styled(Link)`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  @media screen and (min-width: 960px) {
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  }
`

class LogoLink extends React.Component {
  constructor(props) {
    super(props)
    const isServicePage = this.props.path.search(servicesRegExp) > -1
    const isSpecialityPage = this.props.path.includes('speciality')
    const serviceTitle = isServicePage
      ? this.props.path.match(servicesRegExp)[0]
      : null
    const service = isSpecialityPage
      ? getSpecialityService(this.props.path)
      : serviceTitle

    this.state = {
      fillColor: isSpecialityPage ? servicesColors[service] : 'black'
    }
  }

  onEnter = isServicePage => {
    this.setState({ fillColor: isServicePage ? 'grey' : 'white' })
  }

  onLeave = (isServicePage, originalFillColor) => {
    this.setState({ fillColor: isServicePage ? 'black' : originalFillColor })
  }

  render() {
    const path = this.props.path || '/'
    const isServicePage = path.search(servicesRegExp) > -1
    const isSpecialityPage = path.includes('speciality')
    const serviceTitle = isServicePage
      ? this.props.path.match(servicesRegExp)[0]
      : null
    const service = isSpecialityPage
      ? getSpecialityService(this.props.path)
      : serviceTitle
    const originalFillColor = servicesColors[service]

    return (
      <Fragment>
        {isSpecialityPage || isServicePage ? (
          <StyledLink to="/">
            <div
              onMouseEnter={() => this.onEnter(isServicePage)}
              onMouseLeave={() =>
                this.onLeave(isServicePage, originalFillColor)
              }
            >
              <ServiceSpecialityLogoLink
                fillColor={this.state.fillColor}
                textColor={isSpecialityPage ? '#090329' : null}
              />
            </div>
          </StyledLink>
        ) : (
          <Link to="/">
            <img role="link" height="48" src={logo} alt="yld logo" />
          </Link>
        )}
      </Fragment>
    )
  }
}

export default LogoLink

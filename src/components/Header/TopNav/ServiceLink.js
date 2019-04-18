import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { capitalize } from 'lodash'

const StyledServiceLink = styled(Link)`
  /* position: absolute; */
  font-size: ${remcalc(30)};
  margin-left: ${remcalc(12)};

  &:hover {
    text-decoration: underline;
    color: ${props => props.hoverColor};
  }
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

const ServiceLink = ({ path }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null

  const isSpecialityPage = path.includes('speciality')
  const service = isSpecialityPage ? getSpecialityService(path) : serviceTitle

  return (
    <Fragment>
      {isServicePage || isSpecialityPage ? (
        <StyledServiceLink
          to={`/${service}`}
          hoverColor={isServicePage ? 'black' : 'white'}
        >
          {capitalize(service)}
        </StyledServiceLink>
      ) : null}
    </Fragment>
  )
}

export default ServiceLink

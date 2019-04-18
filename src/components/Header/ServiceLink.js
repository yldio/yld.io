import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { capitalize } from 'lodash'

const styledService = `
  position: absolute;
  font-size: 30px;
  top: 20px;
  left: 100px;
`

const StyledServiceLink = styled(Link)`
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

const TopNavTitle = ({ path }) => {
  const isServicePage = path.search(servicesRegExp) > -1
  const serviceTitle = isServicePage ? path.match(servicesRegExp)[0] : null

  const isSpecialityPage = path.includes('speciality')
  const service = isSpecialityPage ? getSpecialityService(path) : serviceTitle

  return (
    <Fragment>
      {isServicePage || isSpecialityPage ? (
        <StyledServiceLink to={`/${service}`}>
          {capitalize(service)}
        </StyledServiceLink>
      ) : null}
    </Fragment>
  )
}

export default TopNavTitle

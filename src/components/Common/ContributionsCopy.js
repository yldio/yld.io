import React, { Fragment } from 'react'
import { SectionTitle } from '../Typography'

const ContributionsCopy = props => {
  const {
    projects,
    contributions,
    titleSectionLine1: first,
    titleSectionLine2: second,
    titleSectionLine3: third
  } = props

  return (
    <Fragment>
      <SectionTitle noPaddingTop reverse>
        {first} <br />
        {contributions} {second} <br />
        {projects} {third}
      </SectionTitle>
    </Fragment>
  )
}

export default ContributionsCopy

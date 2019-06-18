import React, { Fragment } from 'react'
import { SectionTitle } from '../Typography'
const ContributionsCopy = props => {
  const {
    openSourceMetaReposCount: projects,
    openSourceMetaPullRequestsCount: contributions,
    contributionsSectionTitleLine1: first,
    contributionsSectionTitleLine2: second,
    contributionsSectionTitleLine3: third
  } = props

  return (
    <Fragment>
      <SectionTitle reverse>
        {first} <br />
        {contributions} {second} <br />
        {projects} {third}
      </SectionTitle>
    </Fragment>
  )
}

export default ContributionsCopy

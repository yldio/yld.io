import React, { Fragment } from 'react'
import { SectionTitle } from '../Typography'
const ContributionsCopy = props => {
  const {
    openSourceMetaRepoCount: projects,
    openSourceMetaPullRequestCount: contributions,
    contributionsSectionTitleLine1: first,
    contributionsSectionTitleLine2: second,
    contributionsSectionTitleLine3: third
  } = props

  return (
    <Fragment>
      <SectionTitle reverse>
        {first} {contributions} {second} {projects} {third}
      </SectionTitle>
    </Fragment>
  )
}

export default ContributionsCopy

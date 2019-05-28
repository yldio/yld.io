import React from 'react'
import { BlueBackground } from '../Common/BlueBackground'
import ContributionsCopy from './ContributionsCopy'
import Repo from '../Repo'
import { generate } from 'shortid'

const Contributions = ({ meta, repos }) => {
  return (
    <BlueBackground>
      <ContributionsCopy />
      {repos &&
        repos.length &&
        repos.map(repo => <Repo key={generate()} {...repo} />)}
    </BlueBackground>
  )
}

export default Contributions

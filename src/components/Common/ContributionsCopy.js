import React, { Fragment } from 'react'
import { SectionTitle } from '../Typography'
import styled from 'styled-components'

const StyledSpan = styled.span`
  font-family: 'PT Mono';
`

const ContributionsCopy = props => {
  const {
    projects,
    contributions,
    titleSectionLine1: first,
    titleSectionLine2: second,
    titleSectionLine3: third,
  } = props

  return (
    <Fragment>
      <SectionTitle reverse>
        {first} <br />
        <StyledSpan>{contributions}</StyledSpan> {second} <br />
        <StyledSpan>{projects}</StyledSpan> {third}
      </SectionTitle>
    </Fragment>
  )
}

export default ContributionsCopy

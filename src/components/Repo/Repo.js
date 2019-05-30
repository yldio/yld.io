import React, { Fragment } from 'react'
import styled from 'styled-components'
import BodyStylised from '../Typography/BodyStylised'
import remcalc from 'remcalc'
import Subtitle from '../Typography/Subtitle'
import Hr from '../Common/Hr'

const StyledHr = styled(Hr)`
  margin-top: ${remcalc(30)};
`

const Repo = ({
  url,
  nameWithOwner,
  pullRequestCount,
  starCount,
  small = false
}) => (
  <Fragment>
    <a href={url}>
      <Subtitle reverse={!small} noPadding>
        {nameWithOwner}
      </Subtitle>
    </a>
    <BodyStylised small={small} noPadding>
      {pullRequestCount} Contributions
    </BodyStylised>
    <BodyStylised small={small} noPadding>
      {starCount} Stars
    </BodyStylised>
    {!small && <StyledHr short />}
  </Fragment>
)

export default Repo

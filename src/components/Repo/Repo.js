import React, { Fragment } from 'react'
import styled from 'styled-components'
import BodyStylised from '../Typography/BodyStylised'
import remcalc from 'remcalc'
import Subtitle from '../Typography/Subtitle'
import Hr from '../Common/Hr'
import ExternalAnchor from '../Common/ExternalAnchor'

const StyledHr = styled(Hr)`
  margin-top: ${remcalc(30)};
`

const Repo = ({
  url,
  nameWithOwner,
  pullRequestCount,
  starCount,
  small = false,
  theme
}) => {
  const isDark = theme === 'dark'
  return (
    <Fragment>
      <ExternalAnchor href={url}>
        <Subtitle reverse={isDark} noPaddingBottom={!small} noPadding={small}>
          {nameWithOwner}
        </Subtitle>
      </ExternalAnchor>
      <BodyStylised small={small} noPadding>
        {pullRequestCount} Contributions
      </BodyStylised>
      <BodyStylised small={small} noPadding>
        {starCount} Stars
      </BodyStylised>
      {!small && <StyledHr muted={isDark} short />}
    </Fragment>
  )
}

export default Repo

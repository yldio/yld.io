import React, { Fragment } from 'react'
import styled from 'styled-components'
import BodyStylised from '../../Typography/BodyStylised'
import remcalc from 'remcalc'
import Subtitle from '../../Typography/Subtitle'
import Hr from '../Hr'
import ExternalAnchor from '../ExternalAnchor'

const StyledHr = styled(Hr)`
  margin-top: ${remcalc(30)};
`

const RepoNameEllipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/**
 *
 * Repo component is used within RepoWithImage component, having
 * an anchor as a parent of another anchor is a no no and write a
 * warning to the console. Passing a conditional link allows us to
 * conditionally render an external anchor or not.
 *
 */
const ConditionalLink = ({ titleLink, url, children }) =>
  titleLink ? <ExternalAnchor href={url}>{children}</ExternalAnchor> : children

const Repo = ({
  url,
  nameWithOwner,
  pullRequestCount,
  starCount,
  small = 'false',
  titleLink = true,
  theme
}) => {
  const isDark = theme === 'dark'
  return (
    <Fragment>
      <ConditionalLink titleLink={titleLink} url={url}>
        <Subtitle reverse={isDark} noPaddingBottom={!small} noPadding={small}>
          <RepoNameEllipsis>{nameWithOwner}</RepoNameEllipsis>
        </Subtitle>
      </ConditionalLink>
      <BodyStylised small={small} noPadding>
        {pullRequestCount} Contributions
      </BodyStylised>
      <BodyStylised small={small} noPadding>
        {starCount} Stars
      </BodyStylised>
      {small && <StyledHr muted={isDark} short />}
    </Fragment>
  )
}

export default Repo

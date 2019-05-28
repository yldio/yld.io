import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const RepoWrapper = styled.div`
  ${props =>
    Object.prototype.hasOwnProperty.call(props, 'img') &&
    `
        color: 'black
    `}
`

const Repo = ({
  url,
  nameWithOwner,
  pullRequestCount,
  starCount,
  img = false,
  imgSrc
}) => (
  <RepoWrapper img>
    {img && imgSrc && (
      <div>
        <img src={imgSrc} alt={`${nameWithOwner} logo`} />
      </div>
    )}
    <Link to={url}>{nameWithOwner}</Link>
    <p>{pullRequestCount}</p>
    <p>{starCount}</p>
  </RepoWrapper>
)

export default Repo

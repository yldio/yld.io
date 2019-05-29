import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import styled from 'styled-components'
import Repo from './Repo'

const Wrapper = styled.div`
  display: inline-block;
  border: 1px solid ${props => props.theme.colors.secondaryText};
`

const ImageWrapper = styled.div`
  padding: ${remcalc(24)};
  display: inline-block;
  border-right: 1px solid ${props => props.theme.colors.secondaryText};
`

const Image = styled.img`
  display: block;
  width: 100%;
`

const RepoWrapper = styled.div`
  display: inline-block;
  padding: ${remcalc(24)};
`

const RepoWithImage = props => {
  const { url, nameWithOwner, imgSrc } = props
  return (
    <Wrapper>
      <Link url={url} style={{ display: 'block' }}>
        <ImageWrapper>
          <Image src={imgSrc} alt={`${nameWithOwner} logo`} />
        </ImageWrapper>
        <RepoWrapper>
          <Repo small {...props} />
        </RepoWrapper>
      </Link>
    </Wrapper>
  )
}

export default RepoWithImage

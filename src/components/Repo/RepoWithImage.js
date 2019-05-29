import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import Repo from './Repo'
import CommonImage from '../Common/Image'
import RatioContainer from '../Common/RatioContainer'

const Wrapper = styled.div`
  display: inline-block;
  border: 1px solid ${props => props.theme.colors.secondaryText};
`

const ImageWrapper = styled.div`
  padding: ${remcalc(24)};
  display: inline-block;
  vertical-align: top;
  border-right: 1px solid ${props => props.theme.colors.secondaryText};
`

const ImageWrapperInner = styled.div`
  width: 72px;
`

const Image = styled(CommonImage)`
  display: block;
  width: 100%;
`

const RepoWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: ${remcalc(24)};
`

const RepoWithImage = props => {
  const { url, nameWithOwner, image } = props
  return (
    <Wrapper>
      <a href={url} style={{ display: 'block' }}>
        <ImageWrapper>
          <ImageWrapperInner>
            <RatioContainer width={100} height={100}>
              {image && <Image image={image} alt={`${nameWithOwner} logo`} />}
            </RatioContainer>
          </ImageWrapperInner>
        </ImageWrapper>
        <RepoWrapper>
          <Repo small {...props} />
        </RepoWrapper>
      </a>
    </Wrapper>
  )
}

export default RepoWithImage

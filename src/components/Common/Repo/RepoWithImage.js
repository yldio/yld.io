import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Repo from './Repo'
import CommonImage from '../Image'
import RatioContainer from '../RatioContainer'
import ExternalAnchor from '../ExternalAnchor'

const Link = styled(ExternalAnchor)`
  display: flex;
`

const Wrapper = styled.div`
  display: inline-block;
  margin: ${props => props.theme.spacing[1.5]} 0;
  width: 100%;

  /* ${breakpoint('smallTablet')`
    margin-bottom: ${props => props.theme.spacing[3]};
  `} */
`

const ImageWrapper = styled.div`
  padding: ${remcalc(24)};
  display: inline-block;
  vertical-align: top;
  border: 1px solid ${props => props.theme.colors.secondaryText};
  border-right: none;
`

const ImageWrapperInner = styled.div`
  width: 72px;
`

const Image = styled(CommonImage)`
  display: block;
  width: 100%;
`

const RepoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  flex-grow: 2;
  vertical-align: top;
  padding: ${remcalc(24)};
  border: 1px solid ${props => props.theme.colors.secondaryText};
`

const RepoWithImage = props => {
  const { url, nameWithOwner, image } = props
  return (
    <Wrapper>
      <Link href={url}>
        <ImageWrapper>
          <ImageWrapperInner>
            <RatioContainer width={100} height={100}>
              {image && <Image image={image} alt={`${nameWithOwner} logo`} />}
            </RatioContainer>
          </ImageWrapperInner>
        </ImageWrapper>
        <RepoWrapper>
          <Repo isImage small={false} {...props} titleLink={false} />
        </RepoWrapper>
      </Link>
    </Wrapper>
  )
}

export default RepoWithImage

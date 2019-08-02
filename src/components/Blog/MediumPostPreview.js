import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import MediumLogo from '../../images/medium-logo'
import { CardTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'
import Image from '../Common/Image'
import Anchor from '../Common/Anchor'

const AuthorMediumLink = styled(Anchor)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: underline;
`

const AuthorAndDate = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const StyledMediumIcon = styled(MediumLogo)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;

  ${breakpoint('smallTablet')`
      width: 80px;
      height: 80px;
  `}

  ${breakpoint('tablet')`
    width: 100px;
    height: 100px;
  `}
`

const MediumPostImage = styled(Image)`
  position: absolute;
  max-width: unset;
  width: auto;
  height: 100%;
`

const MediumRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[3]};
  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const ImageWrapper = styled.div`
  position: relative;
  padding-top: ${({ theme }) => theme.space[3]};
  ${breakpoint('smallTablet')`
    padding-bottom: 0;
    padding-top: 0;
  `};
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${({ theme }) => theme.space[3]};
  padding-top: ${({ theme }) => theme.space[3]};
  ${props =>
    props.show === 'smallTablet' ? `display: block;` : `display: none;`}
  ${breakpoint('smallTablet')`
    ${props =>
      props.show === 'smallTablet' ? `display: none;` : `display: block;`}
  `};
`

const TitleAndAuthorWrapper = styled.div`
  display: none;
  padding-bottom: ${({ theme }) => theme.space[3]};
  ${({ show, hide }) =>
    breakpoint(show, hide)`
      padding-bottom: 0;
      display: block;
    `}
`

const InfoCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const TitleAndAuthor = ({
  title,
  author,
  formattedDate,
  postUrl,
  authorUrl,
  show,
  hide
}) => {
  return (
    <TitleAndAuthorWrapper show={show} hide={hide}>
      <Anchor href={postUrl}>
        <CardTitle>{title}</CardTitle>
      </Anchor>
      <AuthorAndDate>
        {author && (
          <AuthorMediumLink href={authorUrl}>{author.name}</AuthorMediumLink>
        )}
        {' • '}
        {formattedDate}
      </AuthorAndDate>
    </TitleAndAuthorWrapper>
  )
}

const MediumPostPreview = ({
  title,
  createdAt,
  uniqueSlug,
  author,
  virtuals
}) => {
  const previewText =
    virtuals.subtitle.length < 145
      ? virtuals.subtitle
      : virtuals.subtitle.slice(0, 145).trim() + '...'

  const previewTextSmallTablet = previewText.slice(0, 85).trim() + '...'

  const formattedDate = format(createdAt, 'MMMM DD')

  const imageUrl = `https://cdn-images-1.medium.com/max/1000/${
    virtuals.previewImage.imageId
  }`
  const postUrl = `https://medium.com/yld-blog/${uniqueSlug}`
  const authorUrl = `https://medium.com/@${author.username}`

  const image = {
    file: { url: imageUrl }
  }

  return (
    <MediumRow>
      <Col width={[1, 1, 1, 1, 4 / 12, 4 / 12]}>
        <TitleAndAuthor
          show="smallPhone"
          hide="smallTablet"
          title={title}
          author={author}
          formattedDate={formattedDate}
          authorUrl={authorUrl}
          postUrl={postUrl}
        />
        <Anchor href={postUrl}>
          <ImageWrapper>
            <RatioContainer width={100} height={100}>
              <MediumPostImage image={image} />
            </RatioContainer>
            <StyledMediumIcon />
          </ImageWrapper>
        </Anchor>
      </Col>
      <InfoCol width={[1, 1, 1, 1, 8 / 12, 6 / 12]} block={false}>
        <TitleAndAuthor
          show="smallTablet"
          title={title}
          author={author}
          formattedDate={formattedDate}
          authorUrl={authorUrl}
          postUrl={postUrl}
        />
        <Col width={[1]} style={{ paddingLeft: 0 }}>
          <StyledBodyPrimary>{previewText}</StyledBodyPrimary>
          <StyledBodyPrimary show="smallTablet">
            {previewTextSmallTablet}
          </StyledBodyPrimary>
        </Col>
        <StyledLink external href={postUrl} title={`Read more about ${title}`}>
          Read more
        </StyledLink>
      </InfoCol>
    </MediumRow>
  )
}

export default MediumPostPreview

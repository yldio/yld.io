import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'
import Image from '../Common/Image'
import { CardTitle, BodyPrimary } from '../Typography'
import MediumLogo from '../../images/medium-logo'

const BlogTitle = styled(CardTitle)`
  ${breakpoint('smallPhone')`
  padding-bottom: ${({ theme }) => theme.space[1]}
`}
`

const AuthorLinkToMedium = styled.a`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: underline;
`

const AuthorAndDate = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const BlogPostPreview = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
`

const StyledMediumIcon = styled(MediumLogo)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;

  ${breakpoint('smallTablet')`
      width: 98px;
      height: 98px;
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
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};
`

const ImageWrapper = styled.div`
  position: relative;
`

const MediumPostPreview = ({ mediumPostData }) => {
  const { title, createdAt, uniqueSlug, author, virtuals } = mediumPostData.node
  const previewText =
    virtuals.subtitle.length < 145
      ? virtuals.subtitle
      : virtuals.subtitle.slice(0, 145) + '...'
  const formattedDate = format(createdAt, 'MMMM DD')

  const imageUrl = `https://cdn-images-1.medium.com/max/2000/${
    virtuals.previewImage.imageId
  }`

  const image = {
    file: { url: imageUrl }
  }

  return (
    <MediumRow>
      <Col width={[1, 1, 1, 1, 4 / 12, 4 / 12]}>
        <ImageWrapper>
          <RatioContainer width={100} height={100}>
            <MediumPostImage image={image} />
          </RatioContainer>
          <StyledMediumIcon />
        </ImageWrapper>
      </Col>
      <Col
        width={[1, 1, 1, 1, 6 / 12, 6 / 12]}
        block={false}
        style={{ alignItems: 'center' }}
      >
        <BlogPostPreview>
          <BlogTitle>{title}</BlogTitle>
          <AuthorAndDate>
            <AuthorLinkToMedium
              target="_blank"
              href={`https://medium.com/@${author.username}`}
            >
              {author.name}
            </AuthorLinkToMedium>
            {' • '}
            {formattedDate}
          </AuthorAndDate>
          <Padding bottom={2} top={1}>
            <BodyPrimary>{previewText}</BodyPrimary>
          </Padding>
          <StyledLink
            title={uniqueSlug}
            target="_blank"
            href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
          >
            Read more
          </StyledLink>
        </BlogPostPreview>
      </Col>
    </MediumRow>
  )
}

export default MediumPostPreview

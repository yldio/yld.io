import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
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

const ExternalImage = styled.div`
  display: flex;
  width: 296px;
  height: 296px;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${breakpoint('tablet')`
  width: 335px;
  height: 335px;
  `}
`

const BlogPostPreview = styled.div`
  ${breakpoint('tablet')`
    margin-top: ${({ theme }) => theme.space[3]};
`}
`

const StyledMediumIcon = styled(MediumLogo)`
  width: 98px;
  height: 98px;
  ${breakpoint('tablet')`
    width: 100px;
    height: 100px;
  `}
`

const MediumPostPreview = ({ mediumPostData }) => {
  const { title, createdAt, uniqueSlug, author, virtuals } = mediumPostData.node
  const previewText =
    virtuals.subtitle.length < 145
      ? virtuals.subtitle
      : virtuals.subtitle.slice(0, 145) + '...'
  const formattedDate = format(createdAt, 'MMMM DD')

  return (
    <Row>
      <Col width={[4 / 12, 4.4 / 12]}>
        <ExternalImage
          imageUrl={`https://cdn-images-1.medium.com/max/2000/${
            virtuals.previewImage.imageId
          }`}
        >
          <StyledMediumIcon />
        </ExternalImage>
      </Col>
      <Col width={[6 / 12]}>
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
    </Row>
  )
}

export default MediumPostPreview

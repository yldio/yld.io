import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import { CardTitle, BodyPrimary } from '../Typography'

const TitleSection = ({ title }) => {
  return (
    <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
      <CardTitle as="h2">{title}</CardTitle>
    </Padding>
  )
}

const AuthorLinkToMedium = styled.a`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: underline;
`

const AuthorAndDate = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const ExternalImage = styled.div`
  width: 335px;
  height: 335px;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const MediumPostPreview = ({ mediumPostData }) => {
  const { title, createdAt, uniqueSlug, author, virtuals } = mediumPostData.node
  const introSentence =
    virtuals.subtitle.length < 145
      ? virtuals.subtitle
      : virtuals.subtitle.slice(0, 145) + '...'
  const formattedDate = format(createdAt, 'MMMM DD')

  return (
    <Row>
      <Col>
        <ExternalImage
          imageUrl={`https://cdn-images-1.medium.com/max/2000/${
            virtuals.previewImage.imageId
          }`}
        />
      </Col>
      <Col width={[6 / 12]}>
        <TitleSection title={title} />
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
          <BodyPrimary>{introSentence}</BodyPrimary>
        </Padding>
        <StyledLink
          title={uniqueSlug}
          target="_blank"
          href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
        >
          Read more
        </StyledLink>
      </Col>
    </Row>
  )
}

export default MediumPostPreview

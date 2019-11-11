import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import { CardTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import Image from '../Common/Image'
import Anchor from '../Common/Anchor'

const Author = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  display: inline-block;

  ${({ href }) => (href ? `text-decoration: underline;` : ``)}
`

const MediumRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[3]};
  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${({ theme, context }) =>
    context === 'homepage' ? theme.space[2] : theme.space[3]};
  padding-top: ${({ theme }) => theme.space[3]};
  ${props =>
    props.show === 'smallTablet' ? `display: block;` : `display: none;`}
  ${breakpoint('smallTablet')`
    ${props =>
      props.show === 'smallTablet' ? `display: none;` : `display: block;`}
  `};

  ${({ context }) =>
    context &&
    breakpoint('smallPhone', 'smallTablet')`
    padding-bottom: 0;
  `}
`

const AuthorAndDate = styled.div`
  padding-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.textLight};

  ${breakpoint('smallTablet')`
    padding-bottom: 0;
  `}
`

const TitleAndAuthorWrapper = styled.div`
  display: none;
  ${({ show, hide }) =>
    breakpoint(show, hide)`
      display: block;
    `};
`

const InfoCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const ReadMoreLink = styled(StyledLink)`
  font-size: ${({ theme }) => theme.spacing[1.5]};

  ${breakpoint('smallPhone', 'smallTablet')`
      display: none;
  `}
`

const TitleAndAuthor = ({
  title,
  authorName,
  authorId,
  formattedDate,
  postUrl,
  show,
  hide,
}) => {
  return (
    <TitleAndAuthorWrapper show={show} hide={hide}>
      <Anchor to={postUrl}>
        <CardTitle>{title}</CardTitle>
      </Anchor>
      <AuthorAndDate>
        {authorName && (
          <Author
            as={authorId && Anchor}
            href={authorId ? `https://medium.com/@${authorId}` : null}
          >
            {authorName}
          </Author>
        )}
        {' • '}
        {formattedDate}
      </AuthorAndDate>
    </TitleAndAuthorWrapper>
  )
}

const MediumPostPreview = ({
  title,
  firstPublishedAt,
  slug,
  authorName,
  authorId,
  context,
  content = {},
  headerImage,
}) => {
  const formattedDate = format(firstPublishedAt, 'MMMM DD')

  const { childMdx: { excerpt } = {} } = content || {}

  const postUrl = `/blog/${slug}`

  return (
    <MediumRow>
      <Col
        width={
          context === 'homepage'
            ? [1, 1, 1, 1, 4 / 12, 3 / 12]
            : [1, 1, 1, 1, 4 / 12, 4 / 12]
        }
      >
        <TitleAndAuthor
          show="smallPhone"
          hide="smallTablet"
          title={title}
          authorName={authorName}
          authorId={authorId}
          formattedDate={formattedDate}
          postUrl={postUrl}
        />
        <Anchor to={postUrl}>
          {headerImage && (
            <Image
              sizes={{ ...headerImage.fluid, aspectRatio: 1 / 1 }}
              image={headerImage}
            />
          )}
        </Anchor>
      </Col>
      <InfoCol
        width={
          context === 'homepage'
            ? [1, 1, 1, 1, 8 / 12, 9 / 12]
            : [1, 1, 1, 1, 8 / 12, 6 / 12]
        }
        block={false}
      >
        <TitleAndAuthor
          show="smallTablet"
          title={title}
          authorName={authorName}
          authorId={authorId}
          formattedDate={formattedDate}
          postUrl={postUrl}
        />
        <Col width={[1]} style={{ paddingLeft: 0 }}>
          <StyledBodyPrimary context={context}>{excerpt}</StyledBodyPrimary>
          <StyledBodyPrimary show="smallTablet" context={context}>
            {excerpt}
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'underline' }}
            >
              Read More...
            </a>
          </StyledBodyPrimary>
        </Col>
        <ReadMoreLink to={postUrl} title={`Read more about ${title}`}>
          Read more
        </ReadMoreLink>
      </InfoCol>
    </MediumRow>
  )
}

export default MediumPostPreview

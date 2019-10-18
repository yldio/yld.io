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

const StyledRatioContainer = styled(RatioContainer)`
  > div {
    position: absolute;
  }
`
const AuthorMediumLink = styled(Anchor)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: underline;
`

const StyledMediumIcon = styled(MediumLogo)`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  left: ${({ theme }) => theme.space[3]};
  width: 64px;
  height: 64px;

  ${breakpoint('tablet')`
    top: ${({ theme }) => theme.space[4]};
    left: ${({ theme }) => theme.space[4]};
  `}
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
  ${breakpoint('smallTablet')`
    padding-bottom: 0;
  `};
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

const AuthorAndDate = styled.p`
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
  formattedDate,
  postUrl,
  authorUrl,
  show,
  hide
}) => {
  return (
    <TitleAndAuthorWrapper show={show} hide={hide}>
      <Anchor to={postUrl}>
        <CardTitle>{title}</CardTitle>
      </Anchor>
      <AuthorAndDate>
        {authorName && (
          <AuthorMediumLink href={authorUrl}>{authorName}</AuthorMediumLink>
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
  content,
  headerImage
}) => {
  const formattedDate = format(firstPublishedAt, 'MMMM DD')

  const { childMdx: { excerpt } = {} } = content

  const postUrl = `/blog/${slug}`
  const authorUrl = `https://medium.com/@${authorId}`

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
          authorUrl={authorUrl}
          formattedDate={formattedDate}
          postUrl={postUrl}
        />
        <Anchor to={postUrl}>
          <ImageWrapper>
            {/* <StyledRatioContainer width={100} height={100}> */}
            {headerImage && <Image image={headerImage} />}
            {/* </StyledRatioContainer> */}
            <StyledMediumIcon />
          </ImageWrapper>
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
          authorUrl={authorUrl}
          formattedDate={formattedDate}
          postUrl={postUrl}
        />
        <Col width={[1]} style={{ paddingLeft: 0 }}>
          <StyledBodyPrimary context={context}>{excerpt}</StyledBodyPrimary>
          <StyledBodyPrimary show="smallTablet" context={context}>
            {previewTextSmallTablet}
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

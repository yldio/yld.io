import React from 'react'
import styled, { css } from 'styled-components'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'

import { PostTitle, Body, PostInfo } from './Typography'
import Hr from '../Common/Hr'
import Format from 'date-fns/format'
import { TagGroup } from './Tag'

import twitterIcon from '../../images/twiter-icon.svg'
import linkedinIcon from '../../images/linkedin-icon.svg'
import { BodyPrimary } from '../Typography'

const PostIntroMetaData = ({ title, author, date, readTime }) => (
  <>
    <PostTitle>{title}</PostTitle>
    <PostInfo>
      by {author} • {Format(date, 'MMMM Do[,] YYYY')}{' '}
      {readTime && `• ${readTime}min`}
    </PostInfo>
    <Hr />
  </>
)

const PostOutroTagSection = styled.section`
  padding-top: ${({ theme }) => theme.space[4]};
`

const ShareWrapper = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[5]};
`

const PostOutroMetaData = ({ author, date, tags, shareUrl }) => (
  <div>
    <Hr />
    <section>
      <Body>
        Written by {author} • {Format(date, 'MMMM do[,] YYYY')}
      </Body>
    </section>
    <Hr />
    {tags && tags.length > 0 && (
      <PostOutroTagSection>
        <TagGroup tags={tags} />
      </PostOutroTagSection>
    )}

    <BodyPrimary bold="true">Share this article</BodyPrimary>

    <ShareWrapper>
      <TwitterShareButton url={shareUrl}>
        <ShareButtonContent
          image={twitterIcon}
          imageAlt="Twitter icon"
          label="Twitter"
        />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl}>
        <ShareButtonContent
          image={linkedinIcon}
          imageAlt="LinkedIn icon"
          label="LinkedIn"
        />
      </LinkedinShareButton>
    </ShareWrapper>
  </div>
)

const ShareButtonContent = ({ image, imageAlt, label }) => (
  <div
    css={css`
      display: flex;
      margin-right: ${({ theme }) => theme.space[3]};
    `}
  >
    <img
      src={image}
      alt={imageAlt}
      css={css`
        padding-right: ${({ theme }) => theme.space[2]};
      `}
    />
    <BodyPrimary
      noPadding
      css={{ display: 'inline-block', textDecoration: 'underline' }}
    >
      {label}
    </BodyPrimary>
  </div>
)

export { PostIntroMetaData, PostOutroMetaData }

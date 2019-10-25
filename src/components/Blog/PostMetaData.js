import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'

import { PostTitle, Body, Subtitle, PostInfo } from './Typography'
import Hr from '../Common/Hr'
import Format from 'date-fns/format'
import { TagGroup } from './Tag'

import twitterIcon from '../../images/twiter-icon.svg'
import linkedinIcon from '../../images/linkedin-icon.svg'

const PostIntroMetaData = ({ title, subtitle, author, date, readTime }) => (
  <>
    <PostTitle hasSubtitle={!!subtitle}>{title}</PostTitle>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    <PostInfo>
      by {author} • {Format(date, 'MMMM do[,] YYYY')}{' '}
      {readTime && `• ${readTime}min`}
    </PostInfo>
    <Hr />
  </>
)

const PostOutroTagSection = styled.section`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const ShareWrapper = styled.div`
  display: flex;
  padding-bottom: ${({ theme }) => theme.space[5]};
  > div {
    margin: ${remcalc(5)} ${remcalc(10)} 0;
  }
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

    <ShareWrapper>
      <TwitterShareButton url={shareUrl}>
        <img src={twitterIcon} alt="Twitter icon" />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <img src={linkedinIcon} alt="LinkedIn icon" />
      </LinkedinShareButton>
    </ShareWrapper>
  </div>
)

export { PostIntroMetaData, PostOutroMetaData }

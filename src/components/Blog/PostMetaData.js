import React from 'react'
import styled from 'styled-components'
import { PostTitle, Body, Subtitle, PostInfo } from './Typography'
import Hr from '../Common/Hr'
import Format from 'date-fns/format'
import { TagGroup } from './Tag'

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
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const PostOutroMetaData = ({ author, date, tags }) => (
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
  </div>
)

export { PostIntroMetaData, PostOutroMetaData }

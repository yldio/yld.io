import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { H1, Body, PostInfo } from './Typography'
import Hr from '../Common/Hr'
import Format from 'date-fns/format'
import { TagGroup } from './Tag'

const PostTitle = styled(H1)`
  padding-bottom: ${remcalc(36)};
`

const PostIntroMetaDataWrapper = styled.div`
  p {
    padding-bottom: ${({ theme }) => theme.space[3]};
  }
`

const PostIntroMetaData = ({ title, author, date, readTime }) => (
  <PostIntroMetaDataWrapper>
    <PostTitle>{title}</PostTitle>
    <PostInfo>
      by {author} • {Format(date, 'MMMM do[,] YYYY')}{' '}
      {readTime && `• ${readTime}min`}
    </PostInfo>
    <Hr />
  </PostIntroMetaDataWrapper>
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

import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { H1, Body } from './Typography'
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

const PostMeta = styled(Body)`
  padding-top: 0;
  padding-bottom: ${remcalc(36)};
`

const PostIntroMetaData = ({ author, date, readTime }) => (
  <PostIntroMetaDataWrapper>
    <PostTitle>Easier GraphQL wrappers for your REST API’s</PostTitle>
    <PostMeta>
      by {author} • {Format(date, 'MMMM do[,] YYYY')}{' '}
      {readTime && `• ${readTime}min`}
    </PostMeta>
    <Hr />
  </PostIntroMetaDataWrapper>
)

const PostOutroTopSection = styled.section`
  padding: ${({ theme }) => theme.space[4]} 0;
`

const PostOutroTagSection = styled.section`
  padding: ${({ theme }) => theme.space[4]} 0;
`

const PostOutroMetaData = ({ author, date, tags }) => (
  <div>
    <Hr />
    <PostOutroTopSection>
      <Body>
        Written by {author} • {Format(date, 'MMMM do[,] YYYY')}
      </Body>
    </PostOutroTopSection>
    <Hr />
    {tags && tags.length > 0 && (
      <PostOutroTagSection>
        <TagGroup tags={tags} />
      </PostOutroTagSection>
    )}
  </div>
)

export { PostIntroMetaData, PostOutroMetaData }

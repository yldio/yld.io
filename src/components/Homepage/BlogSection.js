import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import generate from 'shortid'
import { Grid, Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import MediumPostPreview from '../Blog/MediumPostPreview'
import Hr from '../Common/Hr'
import { SectionTitle } from '../Typography'

const MediumLink = styled(StyledLink)`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`

const BlogRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('desktop')`
      padding-top: ${({ theme }) => theme.space[5]};
  `}
`

const TitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.space[4]};
   `}
`
const BlogSection = ({ blogPosts }) => (
  <Grid>
    <BlogRow>
      <TitleCol width={[1]}>
        <SectionTitle>From the blog</SectionTitle>
      </TitleCol>
      {blogPosts.map((mediumPostData, idx, arr) => (
        <Col width={[1]} key={generate()}>
          <MediumPostPreview {...mediumPostData.node} />
          {idx < arr.length - 1 && <Hr />}
        </Col>
      ))}
      <Col width={[1]}>
        <MediumLink to={'/blog'}>Read our blog</MediumLink>
      </Col>
    </BlogRow>
  </Grid>
)

export default BlogSection

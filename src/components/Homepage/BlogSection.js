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
  font-size: ${({ theme }) => theme.spacing[1.5]};
  margin-top: ${({ theme }) => theme.space[2]};

  ${breakpoint('tablet')`
      margin-top: ${({ theme }) => theme.space[4]};
  `}
`

const MobileBlogRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[5]};
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const NonMobileBlogRow = styled(Row)`
  display: none;
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    display: block;
  `}

  ${breakpoint('tablet')`
      padding-top: ${({ theme }) => theme.space[6]};
      padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const TitleCol = styled(Col)`
  padding-bottom: 0;

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.space[4]};
   `}
`
const BlogSection = ({ blogPosts }) => (
  <Grid>
    <MobileBlogRow>
      <TitleCol width={[1]}>
        <SectionTitle>From the blog</SectionTitle>
      </TitleCol>
      <Col width={[1]} key={generate()}>
        <MediumPostPreview {...blogPosts[0].node} context="homepage" />
      </Col>
      <Col width={[1]}>
        <MediumLink to={'/blog'}>Read our blog</MediumLink>
      </Col>
    </MobileBlogRow>
    <NonMobileBlogRow>
      <TitleCol width={[1]}>
        <SectionTitle>From the blog</SectionTitle>
      </TitleCol>
      {blogPosts.map((mediumPostData, idx, arr) => (
        <Col width={[1]} key={generate()}>
          <MediumPostPreview {...mediumPostData.node} context="homepage" />
          {idx < arr.length - 1 && <Hr />}
        </Col>
      ))}
      <Col width={[1]}>
        <MediumLink to={'/blog'}>Read our blog</MediumLink>
      </Col>
    </NonMobileBlogRow>
  </Grid>
)

export default BlogSection

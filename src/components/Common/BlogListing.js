import React from 'react'
import { Padding } from 'styled-components-spacing'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { Grid } from '../grid'
import TitleAndMediaList from '../Common/TitleAndMediaList'
import GreyBackground from './GreyBackground'

const Wrapper = ({ bgColor, children }) => {
  switch (bgColor) {
    case 'Grey':
      return <GreyBackground>{children}</GreyBackground>
    default:
      return <>{children}</>
  }
}
const BlogListing = ({
  title,
  description,
  posts,
  blogBackgroundColor = 'white'
}) => {
  const mediaItems = posts.map(({ id, title, slug, firstPublishedAt }) => ({
    id,
    title,
    href: `https://medium.com/yld-blog/${slug}`,
    body: format(new Date(firstPublishedAt), 'MMMM DD[,] dddd')
  }))

  return (
    <Wrapper bgColor={blogBackgroundColor}>
      <Grid>
        <Padding vertical={{ desktop: 5, smallPhone: 3.5 }}>
          <TitleAndMediaList
            title={title}
            description={description}
            mediaItems={mediaItems}
            CTALink="/blog/"
            external
            CTAText="Visit our blog"
          />
        </Padding>
      </Grid>
    </Wrapper>
  )
}

BlogListing.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mediaItems: PropTypes.array.isRequired,
  CTALink: PropTypes.string
}

BlogListing.defaultProps = {
  CTALink: '/blog/'
}

export default BlogListing

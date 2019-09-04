import React from 'react'
import { Padding } from 'styled-components-spacing'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { Grid } from '../grid'
import TitleAndMediaList from '../Common/TitleAndMediaList'

const BlogListing = ({ title, description, posts }) => {
  const mediaItems = posts.map(({ id, title, slug, firstPublishedAt }) => ({
    id,
    title,
    href: `https://medium.com/yld-blog/${slug}`,
    body: format(new Date(firstPublishedAt), 'MMMM DD[,] dddd')
  }))

  return (
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

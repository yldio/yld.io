import React from 'react'
import PropTypes from 'prop-types'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'

import { Grid } from '../grid'
import TitleAndMediaList from '../Common/TitleAndMediaList'

const BlogListing = ({ title, description, posts }) => {
  const mediaItems = posts.map(
    ({ id, title, uniqueSlug, firstPublishedAt }) => ({
      id,
      title,
      href: `https://medium.com/yld-blog/${uniqueSlug}`,
      body: format(new Date(firstPublishedAt), 'MMMM DD[,] dddd')
    })
  )
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
  description: PropTypes.string.isRequired
}

export default BlogListing

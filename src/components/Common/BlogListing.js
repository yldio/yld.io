import React from 'react';
import { Padding } from 'styled-components-spacing';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { Grid } from '../grid';
import TitleAndMediaList from '../Common/TitleAndMediaList';
import BackgroundColorWrapper from '../Common/BackgroundColorWrapper';

const BlogListing = ({ title, description, posts, bgColor }) => {
  const mediaItems = posts.map(({ id, title, slug, firstPublishedAt }) => ({
    id,
    title,
    to: `/blog/${slug}`,
    body: format(new Date(firstPublishedAt), 'MMMM DD[,] dddd'),
  }));

  return (
    <BackgroundColorWrapper bgColor={bgColor}>
      <Padding vertical={{ desktop: 5, smallPhone: 3.5 }}>
        <Grid>
          <TitleAndMediaList
            external={false}
            title={title}
            description={description}
            mediaItems={mediaItems}
            CTALink="/blog/"
            CTAText="Visit our blog"
          />
        </Grid>
      </Padding>
    </BackgroundColorWrapper>
  );
};

BlogListing.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mediaItems: PropTypes.array,
  CTALink: PropTypes.string,
};

BlogListing.defaultProps = {
  CTALink: '/blog/',
  mediaItems: [],
};

export default BlogListing;

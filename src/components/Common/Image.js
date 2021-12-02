import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

const Image = ({ image, alt, className, ...props }) => {
  if (!image) {
    return null;
  }

  return image.gatsbyImageData ? (
    <GatsbyImage
      alt={alt || image.title}
      image={image.gatsbyImageData}
      className={className}
      loading="lazy"
      {...props}
    />
  ) : (
    <img
      alt={alt || image.title}
      src={(image.file || {}).url}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

export default styled(Image)`
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  height: ${(props) => (props.height ? `${props.height}` : 'auto')};
`;

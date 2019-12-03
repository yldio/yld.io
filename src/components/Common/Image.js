import React from 'react';
import Img from 'gatsby-image';

const Image = ({
  image,
  alt,
  className,

  // used as inline styled to help browser lazy-load
  width = '100%',
  height = 'auto',

  ...props
}) => {
  return (image.fluid || {}).src ? (
    <Img
      loading="lazy"
      style={{ width, height }}
      alt={alt || image.title}
      fluid={image.fluid}
      className={className}
      {...props}
    />
  ) : (
    <img
      loading="lazy"
      style={{ width, height }}
      alt={alt || image.title}
      src={(image.file || {}).url}
      className={className}
      {...props}
    />
  );
};

export default Image;

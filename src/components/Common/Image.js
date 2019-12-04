import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Image = ({ image, alt, className, ...props }) => {
  return (image.fluid || {}).src ? (
    <Img
      alt={alt || image.title}
      fluid={image.fluid}
      className={className}
      {...props}
    />
  ) : (
    <img
      alt={alt || image.title}
      src={(image.file || {}).url}
      className={className}
      {...props}
    />
  );
};

export default styled(Image)`
  width: ${props => (props.width ? `${props.width}` : '100%')};
  height: ${props => (props.height ? `${props.height}` : 'auto')};
`;

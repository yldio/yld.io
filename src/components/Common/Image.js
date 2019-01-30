import React from 'react'
import Img from 'gatsby-image'

const Image = ({ image, alt, className }) =>
  (image.fluid || {}).src ? (
    <Img alt={alt || image.title} fluid={image.fluid} className={className} />
  ) : (
    <img
      alt={alt || image.title}
      src={(image.file || {}).url}
      className={className}
    />
  )

export default Image

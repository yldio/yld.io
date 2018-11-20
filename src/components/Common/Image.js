import React from 'react'
import Img from 'gatsby-image'

const Image = ({ image, alt }) =>
  (image.fluid || {}).src ? (
    <Img alt={alt || image.title} fluid={image.fluid} />
  ) : (
    <img alt={alt || image.title} src={(image.file || {}).url} />
  )

export default Image

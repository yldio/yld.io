import React from 'react'
import { Link } from 'gatsby'
import ExternalAnchor from './ExternalAnchor'

const Anchor = ({ to, href, ...props }) => {
  const appropriateProps = {}
  let Component

  if (to != null) {
    Component = Link
    appropriateProps.to = to
  } else {
    Component = ExternalAnchor
    appropriateProps.href = href
  }

  return <Component {...appropriateProps} {...props} />
}

export default Anchor

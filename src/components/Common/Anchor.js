import React from 'react'
import { Link } from 'gatsby'
import ExternalAnchor from './ExternalAnchor'

const Anchor = ({ to, href, ...props }) => {
  if (to != null) {
    return <Link to={to} {...props} />
  } else {
    return <ExternalAnchor href={href} {...props} />
  }
}

export default Anchor

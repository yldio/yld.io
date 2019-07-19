import React from 'react'
import { Link } from 'gatsby'
import ExternalAnchor from './ExternalAnchor'

const Anchor = ({ to, href, activeClassName, ...props }) =>
  to != null ? (
    <Link to={to} activeClassName={activeClassName} {...props} />
  ) : (
    <ExternalAnchor href={href} {...props} />
  )

export default Anchor

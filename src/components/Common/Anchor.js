import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ExternalAnchor from './ExternalAnchor'

const Anchor = ({ to, href, activeClassName, ...props }) => {
  if (to != null) {
    return <Link to={to} activeClassName={activeClassName} {...props} />
  } else {
    return <ExternalAnchor href={href} {...props} />
  }
}

Anchor.propTypes = {
  title: PropTypes.string.isRequired
}

export default Anchor

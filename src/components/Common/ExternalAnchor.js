import React from 'react'
import PropTypes from 'prop-types'

const ExternalAnchor = ({ children, openInNewWindow = true, ...props }) => {
  return (
    <a
      rel="noopener noreferrer"
      target={openInNewWindow ? '_blank' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

ExternalAnchor.propTypes = {
  title: PropTypes.string.isRequired
}

export default ExternalAnchor

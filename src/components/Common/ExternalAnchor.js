import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const ExternalAnchor = ({ children, openInNewWindow = true, ...props }) => {
  return (
    <OutboundLink
      rel="noopener noreferrer"
      target={openInNewWindow ? '_blank' : undefined}
      {...props}
    >
      {children}
    </OutboundLink>
  )
}

ExternalAnchor.propTypes = {
  title: PropTypes.string.isRequired
}

export default ExternalAnchor

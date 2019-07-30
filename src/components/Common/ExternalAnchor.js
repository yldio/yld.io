import React from 'react'
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

export default ExternalAnchor

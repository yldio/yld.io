import React from 'react'

const ExternalAnchor = ({ children, openInNewWindow = true, ...props }) => (
  <a
    rel="noopener noreferrer"
    target={openInNewWindow ? '_blank' : undefined}
    {...props}
  >
    {children}
  </a>
)
export default ExternalAnchor

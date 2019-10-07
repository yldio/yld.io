import React from 'react'
import GreyBackground from './GreyBackground'

const BackgroundColorWrapper = ({ bgColor, children }) => {
  switch (bgColor && bgColor.toLowerCase()) {
    case 'grey':
      return <GreyBackground>{children}</GreyBackground>
    default:
      return <>{children}</>
  }
}

export default BackgroundColorWrapper

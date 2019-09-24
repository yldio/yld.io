import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import ExternalAnchor from '../Common/ExternalAnchor'
import Image from '../Common/Image'

const TappableAnchor = styled(ExternalAnchor)`
  width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-left: -${({ theme, imageSize }) => remcalc((theme.elementSizes.tappableArea - imageSize) / 2)};
  }
`

const SocialLink = ({ name, url, image, IMAGE_SIZE = 24 }) => {
  const size = `${IMAGE_SIZE}px`

  return (
    <TappableAnchor title={`${name} account`} href={url} imageSize={IMAGE_SIZE}>
      <Image image={image} alt={name} width={size} height={size} />
    </TappableAnchor>
  )
}

export default SocialLink

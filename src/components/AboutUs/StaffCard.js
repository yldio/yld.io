import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import { BodyPrimary, Subtitle } from '../Typography'

import twitter from '../../images/twiter-icon.svg'
import linkedin from '../../images/linkedin-icon.svg'
import ExternalAnchor from '../Common/ExternalAnchor'
import Image from '../Common/Image'

const IMAGE_SIZE = 24

const TappableAnchor = styled(ExternalAnchor)`
  width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-left: -${props => remcalc((props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
  }
`

const LinksContainer = styled.div`
  display: flex;
  margin-top: -${props => remcalc((props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
  padding-bottom: ${props =>
    remcalc(18 - (props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
`

const Description = styled(BodyPrimary)`
  padding-bottom: ${props => remcalc(30)};
`

const getSocialLink = ({ network, url }) => {
  const size = `${IMAGE_SIZE}px`

  switch (network) {
    case 'twitter':
      return (
        <TappableAnchor href={url}>
          <Image
            image={{ file: { url: twitter } }}
            alt="twitter profile link"
            width={size}
            height={size}
          />
        </TappableAnchor>
      )
    case 'linkedin':
      return (
        <TappableAnchor href={url}>
          <Image
            image={{ file: { url: linkedin } }}
            alt="linkedin  profile link"
            width={size}
            height={size}
          />
        </TappableAnchor>
      )
    default:
      return null
  }
}

const StaffCard = ({ name, image, title, description, socialLinks = [] }) => {
  const links = (socialLinks || []).map(getSocialLink).filter(e => e)
  const Links =
    links.length > 0 ? (
      <LinksContainer>{links.map((Link, idx) => Link)}</LinksContainer>
    ) : null

  return (
    <Col width={[1, 1, 1, 1, 6 / 12, 4 / 12]}>
      <Padding bottom={2}>
        <Image image={image} width="100%" />
      </Padding>
      <Subtitle noPadding>{name}</Subtitle>
      <Padding bottom={3}>
        <Subtitle noPadding muted>
          {title}
        </Subtitle>
      </Padding>
      <Description noPadding>{description}</Description>
      {Links}
    </Col>
  )
}

export default StaffCard

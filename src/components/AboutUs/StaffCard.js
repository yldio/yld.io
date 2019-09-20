import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import PropTypes from 'prop-types'
import { Col } from '../grid'
import { Padding } from 'styled-components-spacing'

import { BodyPrimary, Subtitle } from '../Typography'
import Image from '../Common/Image'
import SocialLink from '../Common/SocialLink'

const IMAGE_SIZE = 24

const LinksContainer = styled.div`
  display: flex;
  margin-top: -${props => remcalc((props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
  padding-bottom: ${props =>
    remcalc(18 - (props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
`

const Description = styled(BodyPrimary)`
  padding-bottom: ${() => remcalc(30)};
`

const SocialLinks = ({ data }) => {
  return (data || []).length > 0 ? (
    <LinksContainer>
      {data.map(({ name, url, image }, idx) => (
        <SocialLink
          imageSize={IMAGE_SIZE}
          key={`${name}-${idx}`}
          name={name}
          url={url}
          image={image}
        />
      ))}
    </LinksContainer>
  ) : null
}

const StaffCard = ({
  name,
  image,
  role,
  description,
  socialLinks = [],
  dataTestId
}) => {
  return (
    <Col width={[1, 1, 1, 1, 6 / 12, 4 / 12]} data-testid={dataTestId}>
      <Padding bottom={{ smallPhone: 3, smallTablet: 3.5, tablet: 5 }}>
        <Padding bottom={2}>
          <Image image={image} width="100%" />
        </Padding>
        <Subtitle noPadding>{name}</Subtitle>
        <Padding bottom={3}>
          <Subtitle noPadding muted>
            {role}
          </Subtitle>
        </Padding>
        <Description noPadding>{description}</Description>
        <SocialLinks data={socialLinks} />
      </Padding>
    </Col>
  )
}

StaffCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  socialLinks: PropTypes.array
}

StaffCard.defaultProps = {
  socialLinks: []
}

export default StaffCard

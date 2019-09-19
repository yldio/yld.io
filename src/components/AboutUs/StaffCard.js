import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import PropTypes from 'prop-types'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'
import is from 'styled-is'

import SocialLink from '../Common/SocialLink'
import { Col } from '../grid'
import { BodyPrimary, Subtitle, CardTitle } from '../Typography'
import GatsbyImage from '../Common/Image'

const IMAGE_SIZE = 24

const LinksContainer = styled.div`
  display: flex;
  margin-top: -${props => remcalc((props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
  padding-bottom: ${props =>
    remcalc(18 - (props.theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};

  ${is('noMarginTop')`
      margin-top: 0;
    `}
`

const Description = styled(BodyPrimary)`
  padding-bottom: ${() => remcalc(30)};
  flex-grow: 2;
`

const SocialLinks = ({ data, noMarginTop }) => {
  return (data || []).length > 0 ? (
    <LinksContainer noMarginTop={noMarginTop}>
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

const WrapperCol = styled(Col)`
  flex-direction: column;
  padding-bottom: ${({ theme, paddingBottom: { smallPhone } }) =>
    theme.space[smallPhone || 4]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme, paddingBottom: { smallTablet } }) =>
      theme.space[smallTablet || 5]};
  `}

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme, paddingBottom: { tablet } }) =>
      theme.space[tablet || 7]};
  `}

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme, paddingBottom: { desktop } }) =>
      theme.space[desktop || 7]};
  `}
`

const EndGroup = styled.div`
  justify-self: end;
`

const Image = styled(GatsbyImage)`
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const StaffCard = ({
  name,
  image,
  role,
  description,
  socialLinks = [],
  dataTestId,
  colWidths = [1, 1, 1, 1, 6 / 12, 4 / 12],
  paddingBottom = {},
  emailAddress,
  contactUsRole
}) => {
  return (
    <WrapperCol
      width={colWidths}
      block={false}
      paddingBottom={paddingBottom}
      data-testid={dataTestId}
    >
      <Image image={image} width="100%" />
      {contactUsRole && <CardTitle bold>{contactUsRole}</CardTitle>}
      <Subtitle noPaddingBottom noPaddingTop={!contactUsRole}>
        {name}
      </Subtitle>
      <Padding bottom={3}>
        <Subtitle noPadding muted>
          {role}
        </Subtitle>
      </Padding>
      <Description noPadding>{description}</Description>
      <EndGroup>
        {emailAddress && (
          <BodyPrimary underline>
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </BodyPrimary>
        )}
        <SocialLinks noMarginTop={emailAddress} data={socialLinks} />
      </EndGroup>
    </WrapperCol>
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

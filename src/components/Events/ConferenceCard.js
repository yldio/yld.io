import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import Image from '../Common/Image'

import Anchor from '../Common/Anchor'

import { Link } from 'gatsby'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'
import { CardTitle, BodyPrimary, CalendarDay } from '../Typography'
const AnchorWrapper = ({ to, children }) =>
  to ? <Anchor to={to}>{children}</Anchor> : children

const ConferenceCard = ({ event }) => {
  const {
    status,
    date,
    eventName,
    eventLocation,
    blurb,
    homepage,
    ctaLink,
    svgImage
  } = event

  const ctaText = status === 'Upcoming' ? 'Get tickets' : 'Watch on YouTube'

  return (
    <Row>
      <Col width={[5 / 12, 4 / 12, 4 / 12]}>
        <BodyPrimary muted>{status}</BodyPrimary>
        <CardTitle as="h2">{eventName}</CardTitle>
        <BodyPrimary>
          {date} • {eventLocation}{' '}
        </BodyPrimary>
      </Col>

      <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12, 5 / 12]}>
        <BodyPrimary noPaddingBottom>{blurb}</BodyPrimary>
        <BodyPrimary noPaddingTop>
          <Link to={homepage} style={{ textDecoration: 'underline' }}>
            Read more
          </Link>
        </BodyPrimary>
        <StyledLink aria-label={ctaText} to={ctaLink} title={ctaText}>
          {ctaText}
        </StyledLink>
      </Col>
      <Col>
        <AnchorWrapper to={homepage}>
          <Image image={svgImage} width="100%" />
        </AnchorWrapper>
      </Col>
    </Row>
  )
}

export default ConferenceCard

import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Link } from 'gatsby'
import { format } from 'date-fns'

import Image from '../Common/Image'
import Anchor from '../Common/Anchor'
import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import { CardTitle, BodyPrimary } from '../Typography'

const BlurbWrapper = styled.div`
  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[3]};
  `};
`

const StatusWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
     padding-top: 0;
    padding-bottom: 0;
  `};
`

const AnchorWrapper = ({ to, children }) =>
  to ? <Anchor to={to}>{children}</Anchor> : children

const ConferenceCard = ({ conference }) => {
  const {
    status = 'status',
    eventTitle,
    blurb,
    linkToEvent,
    posterImage,
    ctaText
  } = conference

  const date = format(new Date(conference.date), 'MMM DD[,] YYYY')

  const address = conference.address.slice(0, 15).trim()

  return (
    <Row>
      <Col width={[8 / 12, 8 / 12, 8 / 12, 8 / 12, 0, 0, 0]}>
        <AnchorWrapper to={linkToEvent}>
          <Image image={posterImage} width="100%" />
        </AnchorWrapper>
      </Col>

      <Col width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
        <StatusWrapper>
          <BodyPrimary noPadding muted>
            {status}
          </BodyPrimary>
        </StatusWrapper>
        <CardTitle as="h3">{eventTitle}</CardTitle>
        <BodyPrimary>
          {date} • {address}{' '}
        </BodyPrimary>
      </Col>

      <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12, 5 / 12]}>
        <BlurbWrapper>
          <BodyPrimary noPaddingBottom>{blurb.blurb}</BodyPrimary>
          <BodyPrimary noPaddingTop>
            <Link to={linkToEvent} style={{ textDecoration: 'underline' }}>
              Read more
            </Link>
          </BodyPrimary>
        </BlurbWrapper>
        <StyledLink aria-label={ctaText} to={linkToEvent} title={ctaText}>
          {ctaText}
        </StyledLink>
      </Col>
      <Col width={[0, 0, 0, 0, 0, 3 / 12, 3 / 12]}>
        <AnchorWrapper to={linkToEvent}>
          <Image image={posterImage} height="100%" />
        </AnchorWrapper>
      </Col>
    </Row>
  )
}

export default ConferenceCard

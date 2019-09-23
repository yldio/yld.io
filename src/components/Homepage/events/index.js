import React from 'react'
import remcalc from 'remcalc'
import generate from 'shortid'
import styled from 'styled-components'
import { Grid, Row, Col } from '../../grid'
import { DisplayTitle, Subtitle, BodyPrimary } from '../../Typography'
import Image from '../../Common/Image'
import StyledLink from '../../Common/StyledLink'
import breakpoint from 'styled-components-breakpoint'

import FeaturedEventRow from './FeaturedEventRow'
import Hr from '../../Common/Hr'

const eventTypes = [
  {
    title: 'Conferences',
    copy:
      'Knowledge-packed talks from some of the communities best and brightest.'
  },
  {
    title: 'Meet ups',
    copy: 'Regular gatherings for both beginners and advanced tech enthusiasts.'
  },
  {
    title: 'Workshops',
    copy:
      'Offering crash courses and technical seesions to expand your digital skills.'
  }
]

const IntroCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const EventType = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const EventTypeCopyWrapper = styled.div`
  background: white;
  padding: ${remcalc(20)} ${remcalc(20)} ${remcalc(50)};
`

const IntroRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[7]};
`

const Events = ({ featuredEvent }) => (
  <Grid>
    <FeaturedEventRow event={featuredEvent} />
    <Hr />
    <IntroRow>
      <IntroCol>
        <DisplayTitle>Our event types</DisplayTitle>
        <BodyPrimary>
          We{"'"}re proud to offer a variety of different YLD-run events, so
          whether you{"'"}re taking your first steps in tech or are a seasoned
          veteran, there{"'"}s something for everyone.
        </BodyPrimary>
      </IntroCol>
      {eventTypes &&
        eventTypes.length > 0 &&
        eventTypes.map(({ title, copy, image }) => (
          <EventType width={[1, 1, 1, 4 / 12]} key={generate()}>
            <EventTypeCopyWrapper>
              <Subtitle noPadding>{title}</Subtitle>
              <BodyPrimary muted>{copy}</BodyPrimary>
              {image && <Image image={image} />}
            </EventTypeCopyWrapper>
          </EventType>
        ))}
      <Col width={[1]}>
        <StyledLink>See all our events</StyledLink>
      </Col>
    </IntroRow>
  </Grid>
)

export default Events

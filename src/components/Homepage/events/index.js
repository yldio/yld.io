import React from 'react'
import remcalc from 'remcalc'
import generate from 'shortid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import Image from '../../Common/Image'
import StyledLink from '../../Common/StyledLink'
import Hr from '../../Common/Hr'
import { Grid, Row, Col } from '../../grid'
import { DisplayTitle, Subtitle, BodyPrimary } from '../../Typography'
import FeaturedEventRow from './FeaturedEventRow'

const EventType = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const EventTypeCopyWrapper = styled.div`
  background: white;
  padding: ${remcalc(20)} ${remcalc(20)} ${remcalc(50)};
`

const IntroRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const CtaRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]};  
  `}
`

const Events = ({ featuredEvent, eventTypes }) => (
  <Grid>
    <FeaturedEventRow event={featuredEvent} />
    <Hr />
    <IntroRow>
      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 5 / 12]}>
        <DisplayTitle>Our event types</DisplayTitle>
        <BodyPrimary>
          We{"'"}re proud to offer a variety of different YLD-run events, so
          whether you{"'"}re taking your first steps in tech or are a seasoned
          veteran, there{"'"}s something for everyone.
        </BodyPrimary>
      </Col>
    </IntroRow>
    <Row>
      {eventTypes &&
        eventTypes.length > 0 &&
        eventTypes.map(({ title, copy, image }) => (
          <EventType
            width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}
            key={generate()}
          >
            <EventTypeCopyWrapper>
              <Subtitle noPadding>{title}</Subtitle>
              <BodyPrimary muted>{copy}</BodyPrimary>
            </EventTypeCopyWrapper>
            {image && <Image image={image} />}
          </EventType>
        ))}
    </Row>
    <CtaRow>
      <Col width={[1]}>
        <StyledLink>See all our events</StyledLink>
      </Col>
    </CtaRow>
  </Grid>
)

export default Events

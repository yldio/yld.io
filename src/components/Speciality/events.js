import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from '../Common/ExternalAnchor'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'

const EventBorder = styled(Col)`
  border: 1px solid rgba(51, 51, 51, 0.15);
`

const EventSection = ({ speciality }) => {
  const futureEvents = (speciality.events || []).filter(
    ({ startTime }) => new Date(startTime) > new Date()
  )

  return futureEvents.length > 0 ? (
    <Grid>
      <Padding top={6} bottom={6}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SectionTitle>{`Upcoming ${speciality.title} events`}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            {futureEvents.map(event => (
              <EventBorder key={`${event.id}`}>
                <Padding top={2} bottom={2}>
                  <Row>
                    <Col>
                      <img
                        src={`https://${speciality.eventIcon.file.url}`}
                        alt={speciality.eventIcon.title}
                      />
                    </Col>
                    <Col>
                      <Subtitle noPadding>
                        <ExternalAnchor href={event.linkToEvent}>
                          {event.eventTitle}
                        </ExternalAnchor>
                      </Subtitle>
                      <BodyPrimary noPadding>
                        {format(new Date(event.date), 'MMMM DD[,] dddd')}
                      </BodyPrimary>
                    </Col>
                  </Row>
                </Padding>
              </EventBorder>
            ))}
          </Col>
        </Row>
      </Padding>
    </Grid>
  ) : null
}
export default EventSection

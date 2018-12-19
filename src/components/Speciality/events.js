import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SmallerH2, H5, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'

const EventBorder = styled(Col)`
  border: 1px solid rgba(51, 51, 51, 0.15);
`

const EventSection = ({ specialty }) => {
  const futureEvents = (specialty.events || []).filter(
    ({ startTime }) => new Date(startTime) > new Date()
  )

  return futureEvents.length > 0 ? (
    <Grid>
      <Padding top={6} bottom={6}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SmallerH2>{`Upcoming ${specialty.title} events`}</SmallerH2>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            {futureEvents.map(event => (
              <EventBorder key={`${event.id}`}>
                <Padding top={2} bottom={2}>
                  <Row>
                    <Col>
                      <img
                        src={`https://${specialty.eventIcon.file.url}`}
                        alt={specialty.eventIcon.title}
                      />
                    </Col>
                    <Col>
                      <H5 bold noMargin>
                        <a
                          href={event.linkToEvent}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {event.eventTitle}
                        </a>
                      </H5>
                      <Paragraph noMargin>
                        {format(new Date(event.date), 'MMMM DD[,] dddd')}
                      </Paragraph>
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

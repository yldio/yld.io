import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SectionTitleH2, SubtitleH3, BodyPrimary } from '../Typography'
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
            <SectionTitleH2>{`Upcoming ${
              speciality.title
            } events`}</SectionTitleH2>
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
                      <SubtitleH3 noMargin>
                        <a
                          href={event.linkToEvent}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {event.eventTitle}
                        </a>
                      </SubtitleH3>
                      <BodyPrimary noMargin>
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

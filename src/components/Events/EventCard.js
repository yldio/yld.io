import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../Common/StyledLink'
import Image from '../Common/Image'
import Anchor from '../Common/Anchor'
import { CardTitle, BodyPrimary, SectionTitle } from '../Typography'
import eventLabels from '../../utils/eventLabels'


const MobileOnlyCol = styled(Col)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const NonMobileCol = styled(Col)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  `}
`

const serviceLinkMapper = {
    Engineering: '/engineering',
    Design: '/design',
    Training: '/training'
}

const TitleSection = ({ services, title, link }) => {
    const serviceElems = services.map((service, index) => {
        const isPenultimate = index === services.length - 2
        const isLast = index === services.length - 1
        const link = serviceLinkMapper[service]
        const element = link ? <Anchor to={link}>{service}</Anchor> : service

        switch (true) {
            case isLast:
                return <Fragment key={index}>{element}</Fragment>
            case isPenultimate:
                // anchor/text + ampersand
                return <Fragment key={index}>{element} &amp; </Fragment>
            default:
                // anchor/text + comma
                return <Fragment key={index}>{element} &#44; </Fragment>
        }
    })

    return (
        <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
            <BodyPrimary muted noPadding>
                {serviceElems}
            </BodyPrimary>
            <Anchor to={link}>
                <CardTitle as="h2">{title}</CardTitle>
            </Anchor>
        </Padding>
    )
}

const InfoSection = ({ introSentence, title, link }) => (
    <Fragment>
        <Padding bottom={{ smallPhone: 0.5, tablet: 1 }}>
            <BodyPrimary>{introSentence}</BodyPrimary>
        </Padding>
        <StyledLink
            aria-label={`Learn more about ${title}`}
            to={link}
            title={`Learn more about ${title}`}
            data-event={eventLabels.learnMoreCTA}
        >
            Learn more
    </StyledLink>
    </Fragment>
)

const DateCard = ({ date }) => (
    <Fragment>
        <SectionTitle noPadding>
            {date.day}
        </SectionTitle>
        <BodyPrimary>
            {date.month.toUpperCase()}
        </BodyPrimary>
    </Fragment>


)

const EventCard = ({ event }) => {
    const { type, date, eventName, eventLocation, startTime, endTime, attendees = 0, link } = event

    return (
        <Row>

            <Col width={[1, 1, 1, 1, 3 / 12, 2 / 12, 2 / 12]}>
                <DateCard date={date} />
            </Col>

            <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
                <BodyPrimary>{type}</BodyPrimary>
                <CardTitle as="h2" noPadding>{eventName}</CardTitle>
                <BodyPrimary muted>{eventLocation} • {startTime} - {endTime} • {attendees} attending</BodyPrimary>
            </Col>

            <Col width={[1, 1, 1, 1, 3 / 12, 4 / 12, 5 / 12]}>
                {type === "meetup" ? <StyledLink aria-label={`More on Meetup`}
                    to={link}
                    title={`More on Meetup`}>More on Meetup</StyledLink> : <StyledLink aria-label={`Get tickets`}
                        to={link}
                        title={`Get tickets`}>Get Tickets</StyledLink>
                }
            </Col>

            {/* 

            <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
                <TitleSection services={services} title={title} link={caseStudyLink} />
            </MobileOnlyCol>
            
            <Col width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
                <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
                    <Anchor to={caseStudyLink}>
                        <Image alt={posterImage.title} image={posterImage} />
                    </Anchor>
                </Padding>
            </Col>
            
            <NonMobileCol width={[0, 0, 0, 0, 7 / 12, 6 / 12]}>
                <TitleSection services={services} title={title} link={caseStudyLink} />
                <InfoSection
                    introSentence={introSentence}
                    title={title}
                    link={caseStudyLink}
                />
            </NonMobileCol>
            
            <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
                <InfoSection
                    introSentence={introSentence}
                    title={title}
                    link={caseStudyLink}
                />
            </MobileOnlyCol> */}
        </Row>
    )
}

export default EventCard

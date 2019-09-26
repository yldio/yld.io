import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Row, Col } from '../../grid'
import Image from '../../Common/Image'
import RatioContainer from '../../Common/RatioContainer'

import StyledLink from '../../Common/StyledLink'
import { SectionTitle, BodyPrimary, DisplayTitle } from '../../Typography'

const InfoInner = styled.section`
  background-color: #${props => props.color};
  width: 100%;
`

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} ${remcalc(36)} 0;
  `}

  ${breakpoint('desktop')`
    padding: ${remcalc(30)} ${remcalc(36)};
  `};
`

const SpacedSectionTitle = styled(SectionTitle)`
  margin-bottom: ${props => props.theme.space[2]};
`

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.space[1]};

  ${breakpoint('desktop')`
    padding-bottom: ${props => props.theme.space[2]};
  `};
`

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-bottom: ${props => props.theme.space[2]};
`

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(380)};
  margin-bottom: ${props => props.theme.space[2]};
`

const StyledImage = styled(Image)`
  /* to remove extra space below SVG */
  display: block;
`

const StyledRatioContainer = styled(RatioContainer)`
  > img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
`
const IntroRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
      padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const EventRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}
`

const WrapperCol = styled(Col)`
  background-color: ${({ bgColor }) => `#${bgColor}`};
`

const FeaturedEvent = ({ event }) => (
  <>
    <IntroRow>
      <Col width={[1, 1, 1, 1, 8 / 12, 7 / 12, 5 / 12]}>
        <SpacedSectionTitle>Events we run</SpacedSectionTitle>
        <BodyPrimary>
          We pride ourselves on offering informative, inclusive and fun
          get-togethers for our ever growing tech community.
        </BodyPrimary>
      </Col>
    </IntroRow>
    <EventRow>
      <WrapperCol width={[1]} bgColor={event.color}>
        <Row>
          <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12]} block={false}>
            <InfoInner color={event.color}>
              <EventWrapper>
                <PaddedBodyPrimary muted reverse noPadding>
                  Featured event
                </PaddedBodyPrimary>
                <StyledDisplayTitle reverse noPaddingTop>
                  {event.eventTitle}
                </StyledDisplayTitle>
                <BodyPrimary reverse>{event.date}</BodyPrimary>
                <FixedWidthBodyPrimary muted reverse>
                  {event.blurb.blurb}
                </FixedWidthBodyPrimary>
                <StyledLink
                  external
                  reverse
                  href={event.linkToEvent}
                  title={`${event.eventTitle} - ${event.ctaText}`}
                >
                  {event.ctaText}
                </StyledLink>
              </EventWrapper>
            </InfoInner>
          </Col>
          <Col
            width={[1, 1, 1, 1, 5 / 12, 7 / 12]}
            block={false}
            style={{ alignItems: 'center' }}
          >
            <StyledRatioContainer width={621} height={358}>
              <StyledImage image={event.posterImage} />
            </StyledRatioContainer>
          </Col>
        </Row>
      </WrapperCol>
    </EventRow>
  </>
)

export default FeaturedEvent

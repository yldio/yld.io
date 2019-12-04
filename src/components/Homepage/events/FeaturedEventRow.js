import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Grid, Row, Col } from '../../grid';
import Image from '../../Common/Image';

import StyledLink from '../../Common/StyledLink';
import { SectionTitle, BodyPrimary, DisplayTitle } from '../../Typography';

const BackgroundColorGrid = styled(Grid)`
  background-color: ${({ bgColor }) => `#${bgColor}`};
  padding: 0;

  ${breakpoint('smallPhone', 'smallTablet')`
    max-width: 100%;
  `}
`;

const InfoInner = styled.section`
  width: 100%;
`;

const EventWrapper = styled.header`
  padding: ${({ theme }) =>
    `${theme.space[3]} ${theme.space[3]} ${theme.space[4]}`};

  ${breakpoint('smallTablet')`
    padding: ${({ theme }) => theme.space[4]};
  `}
`;

const SpacedSectionTitle = styled(SectionTitle)`
  margin-bottom: ${props => props.theme.space[2]};
`;

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.space[1]};

  ${breakpoint('desktop')`
    padding-bottom: ${props => props.theme.space[2]};
  `};
`;

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-bottom: ${props => props.theme.space[2]};
`;

const IntroRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
      padding-top: ${({ theme }) => theme.space[6]};
  `}
`;

const EventRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}
`;

const DesktopImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[4]};

  > img {
    position: absolute;
    right: ${({ theme }) => theme.space[4]};
    height: calc(100% - 2 * ${({ theme }) => theme.space[4]});
    width: auto;
  }

  ${breakpoint('smallPhone', 'smallTablet')`
    display: none;
  `}
`;
const MobileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) =>
    `${theme.spacing[1.5]} ${theme.space[3]} ${theme.space[3]} ${
      theme.space[3]
    }`};

  > img {
    display: block;
  }

  ${breakpoint('smallTablet')`
    display: none;
  `}
`;

const FeaturedEvent = ({ event }) => (
  <>
    <IntroRow>
      <Col width={[1, 1, 1, 1, 8 / 12, 7 / 12, 5 / 12]}>
        <SpacedSectionTitle>Events we run</SpacedSectionTitle>
        <BodyPrimary muted>
          We pride ourselves on offering informative, inclusive and fun
          get-togethers for our ever growing tech community.
        </BodyPrimary>
      </Col>
    </IntroRow>
    <EventRow>
      <Col width={[1]}>
        <BackgroundColorGrid bgColor={event.color}>
          <Row>
            <Col width={[1, 1, 1, 1, 7 / 12, 7 / 12, 5 / 12]}>
              <InfoInner>
                <EventWrapper>
                  <PaddedBodyPrimary reverse="true" noPadding>
                    Featured event
                  </PaddedBodyPrimary>
                  <StyledDisplayTitle reverse="true" noPaddingTop>
                    {event.eventTitle}
                  </StyledDisplayTitle>
                  <BodyPrimary reverse="true">{event.date}</BodyPrimary>
                  <BodyPrimary reverse="true">{event.blurb.blurb}</BodyPrimary>
                  <StyledLink
                    external
                    reverse="true"
                    href={event.linkToEvent}
                    title={`${event.eventTitle} - ${event.ctaText}`}
                  >
                    {event.ctaText}
                  </StyledLink>
                </EventWrapper>
              </InfoInner>
            </Col>
            <Col width={[1, 1, 1, 1, 5 / 12, 5 / 12, 7 / 12]}>
              <DesktopImageWrapper>
                <Image image={event.desktopPosterImage} />
              </DesktopImageWrapper>
              <MobileImageWrapper>
                <Image image={event.mobilePosterImage} />
              </MobileImageWrapper>
            </Col>
          </Row>
        </BackgroundColorGrid>
      </Col>
    </EventRow>
  </>
);

export default FeaturedEvent;

import React from 'react';
import InternalAnchor from '../Common/InternalAnchor';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Row, Col, Grid } from '../grid';

import Image from '../Common/Image';

import SeoLinks from '../Common/seoLinks';
import { DisplayTitle, CardTitle, BodyPrimary } from '../Typography';

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const ServiceGrid = styled(Grid)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 0;

  ${breakpoint('smallPhone', 'tablet')`
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-flow: row;
   `};
`;

const StyledRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`;

const ServiceTitle = styled(CardTitle)`
  text-decoration: underline;
`;

const ServiceCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}
`;

const ServiceSentence = styled(BodyPrimary)`
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const SpecialityList = styled(SeoLinks)`
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  text-align: justify;
  position: relative;
`;

const Services = ({ statement, services }) => (
  <>
    <StyledRow>
      {statement && (
        <Col width={[1, 1, 1, 1, 1, 10 / 12, 7 / 12]}>
          <DisplayTitle>{statement}</DisplayTitle>
        </Col>
      )}
    </StyledRow>
    <ServiceGrid>
      {services.map(
        (service) =>
          service.introSentence && (
            <div key={service.slug}>
              <ServiceCol width={[1, 1, 1, 1 / 2, 9 / 12]}>
                {service.icon && (
                  <ImageWrapper>
                    <Image title={service.icon.title} image={service.icon} />
                  </ImageWrapper>
                )}
                <ServiceTitle noPadding>
                  <InternalAnchor to={`/${service.slug}`}>
                    {service.title}
                  </InternalAnchor>
                </ServiceTitle>

                <ServiceSentence>
                  {service.introSentence.introSentence}
                </ServiceSentence>

                <SpecialityList items={service.homePageSpecialities} />
              </ServiceCol>
              {/* This grid has no offsets so this is what we're left with... */}
              <Col width={[0, 0, 0, 1 / 12]} />
            </div>
          ),
      )}
    </ServiceGrid>
  </>
);

export default Services;

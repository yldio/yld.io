import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'

import { Row, Col } from '../grid'

import breakpoint from 'styled-components-breakpoint'
import Image from '../Common/Image'

import SeoLinks from '../Common/seoLinks'
import Statement from '../Common/Statement'
import { DisplayTitle, CardTitle, BodyPrimary } from '../Typography'

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const StyledRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const ServiceRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[5]};
`

const ServiceTitle = styled(CardTitle)`
  text-decoration: underline;
`

const ServiceCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[5]};
`

const Services = ({ statement, services }) => (
  <>
    <StyledRow>
      {statement && (
        <Col width={[1, 1, 1, 7 / 12]}>
          <DisplayTitle>{statement}</DisplayTitle>
        </Col>
      )}
    </StyledRow>
    <ServiceRow>
      {services.map(
        service =>
          service.introSentence && (
            <>
              <ServiceCol width={[1, 1, 1, 1 / 2, 5 / 12]}>
                {service.icon && (
                  <ImageWrapper>
                    <Image image={service.icon} />
                  </ImageWrapper>
                )}
                <ServiceTitle noPadding>
                  <Link to={`/${service.slug}`}>{service.title}</Link>
                </ServiceTitle>

                <BodyPrimary>{service.introSentence.introSentence}</BodyPrimary>

                <SeoLinks items={service.homePageSpecialities} />
              </ServiceCol>
              {/* This grid has no offsets so this is what we're left with... */}
              <Col width={[0, 0, 0, 1 / 12]} />
            </>
          )
      )}
    </ServiceRow>
  </>
)

export default Services

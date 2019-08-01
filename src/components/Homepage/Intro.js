import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import illustrationDesktop from '../../images/yld_illustration_desktop.svg'
import illustrationMobile from '../../images/yld_illustration_mobile.svg'
import { Grid, Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import BlueBackground from '../Common/BlueBackground'
import { SectionTitle, CardTitle, Subtitle } from '../Typography'

const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(36)};
  position: relative;
`

const IntroRow = styled(Row)`
  z-index: 1;
  padding-top: ${({ theme }) => theme.space[4]};
  position: relative;

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const StyledCardTitle = styled(CardTitle)`
  display: inline-block;
  text-decoration: underline;
`

const IntroLinkWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const IntroSectionTitleWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const IntroImageWrapper = styled.div`
  width: 100%;

  ${breakpoint('smallPhone', 'smallTablet')`
    width: 135%;
    margin-top: -24%;
  `}

  ${breakpoint('smallTablet')`
    bottom: 0;
    left: 50%;
    right: 0;
    position: absolute;
    width: 1000px;
  `}

  ${breakpoint('tablet')`
    width: 1500px;
  `}
  `

const IntroImageDesktop = styled.div`
  display: none;
  position: relative;

  ${breakpoint('smallTablet')`
    left: calc(-50% + 72px);
    display: block;
    `}

  ${breakpoint('tablet')`
    left: calc(-50% + 80px);
    `}

  > img {
    display: block;
  }
`

const IntroImageMobile = styled.div`
  position: relative;
  ${breakpoint('smallTablet')`
    display: none;
  `}

  > img {
    display: block;
  }
`

const IntroSection = () => {
  const [first, toggle] = useState(true)

  const introCopy = first
    ? "We're a technology company that builds great technology  companies"
    : 'Creating digital capabilities for you, that lasts beyond us.'

  const titleCopy = first
    ? 'Consultancy services we offer'
    : 'Services we offer'

  return (
    <StyledBlueBackground>
      <Grid>
        <IntroRow>
          <Col width={[1, 1, 1, 1, 7 / 12]} style={{ position: 'relative' }}>
            <IntroSectionTitleWrapper>
              <SectionTitle reverse as="h1">
                {introCopy}
              </SectionTitle>
            </IntroSectionTitleWrapper>
            <Subtitle reverse muted>
              {titleCopy}
            </Subtitle>
            <IntroLinkWrapper>
              <StyledCardTitle noPaddingTop as={Link} reverse to="/engineering">
                Software engineering
              </StyledCardTitle>
              <br />
              <StyledCardTitle noPaddingTop as={Link} reverse to="/design">
                Digital product design
              </StyledCardTitle>
              <br />
              <StyledCardTitle noPaddingTop as={Link} reverse to="/training">
                Training programs
              </StyledCardTitle>
            </IntroLinkWrapper>
            <StyledLink reverse vibrant as="p" onClick={() => toggle(!first)}>
              See our work
            </StyledLink>
          </Col>
        </IntroRow>
      </Grid>
      <IntroImageWrapper>
        {illustrationDesktop && (
          <IntroImageDesktop>
            <img
              alt="YLD homepage illustration for desktop views"
              src={illustrationDesktop}
            />
          </IntroImageDesktop>
        )}
        {illustrationMobile && (
          <IntroImageMobile>
            <img
              alt="YLD homepage illustration for mobile views"
              src={illustrationMobile}
            />
          </IntroImageMobile>
        )}
      </IntroImageWrapper>
    </StyledBlueBackground>
  )
}

export default IntroSection

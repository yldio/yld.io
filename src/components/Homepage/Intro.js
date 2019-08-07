import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'

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

const StyledUl = styled(CardTitle)`
  > li {
    list-style: none;
    padding-bottom: ${({ theme }) => theme.space[2]};
  }
`

const IntroLinkWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[3]};
  `}
`

const IntroSectionTitleWrapper = styled.div`
  max-width: ${remcalc(550)};
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

const IntroSection = ({
  introHeader,
  introContent: { introContent },
  introCtaText,
  introCtaLink
}) => {
  return (
    <StyledBlueBackground>
      <Grid>
        <IntroRow>
          <Col width={[1, 1, 1, 1, 7 / 12]} style={{ position: 'relative' }}>
            <IntroSectionTitleWrapper>
              <SectionTitle reverse as="h1">
                {introHeader}
              </SectionTitle>
            </IntroSectionTitleWrapper>
            <IntroLinkWrapper>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <Subtitle reverse muted {...props} />,
                  // eslint-disable-next-line
                  list: props => <StyledUl noPaddingTop reverse {...props} />
                }}
                source={introContent}
              />
            </IntroLinkWrapper>
            <StyledLink reverse vibrant to={introCtaLink}>
              {introCtaText}
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

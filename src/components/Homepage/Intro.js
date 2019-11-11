import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';
import ReactMarkdown from 'react-markdown';

import illustrationDesktop from '../../images/hero_image_desktop.svg';
import illustrationMobile from '../../images/hero_image_mobile.svg';
import { Grid, Row, Col } from '../grid';
import BlueBackground from '../Common/BlueBackground';
import { SectionTitle, CardTitle, Subtitle } from '../Typography';

const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(36)};
  position: relative;
`;

const IntroRow = styled(Row)`
  z-index: 1;
  padding-top: ${({ theme }) => theme.space[4]};
  position: relative;

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[8]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}

  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[8]};
    padding-bottom: ${({ theme }) => theme.space[9]};
  `}
`;

const StyledCardTitle = styled(CardTitle)`
  > li {
    list-style: none;
    padding-bottom: ${remcalc(8)};
  }
`;

const IntroSectionTitleWrapper = styled.div`
  max-width: ${remcalc(425)};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    max-width: ${remcalc(490)};
  `}

  ${breakpoint('desktop')`
    max-width: ${remcalc(550)};
  `}
`;

const IntroImageWrapper = styled.div`
  width: 100%;

  ${breakpoint('smallPhone', 'smallTablet')`
    width: 135%;
    margin-top: -14%;
  `}

  ${breakpoint('smallTablet')`
    bottom: 0;
    left: 46.7%;
    right: 0;
    position: absolute;
    width: 1000px;
  `}

  ${breakpoint('tablet')`
    width: 1120px;
  `}

  ${breakpoint('desktop')`
    width: 1500px;
  `}
  `;

const IntroImageDesktop = styled.div`
  display: none;
  position: relative;

  ${breakpoint('smallTablet')`
    left: calc(-50% + 127px);
    display: block;
  `}

  ${breakpoint('tablet')`
    left: calc(-50% + 80px);
  `}

  ${breakpoint('desktop')`
    left: calc(-50% + 175px);
  `}

  > img {
    display: block;
  }
`;

const IntroImageMobile = styled.div`
  position: relative;
  ${breakpoint('smallTablet')`
    display: none;
  `}

  > img {
    display: block;
  }
`;

const StyledSectionTitle = styled(SectionTitle)`
  ${breakpoint('tablet')`
    font-size: ${remcalc(36)};
    line-height: ${remcalc(42)};
  `};

  ${breakpoint('desktop')`
    font-size: ${remcalc(42)};
    line-height: ${remcalc(48)};
  `};
`;

const IntroSection = ({ introHeader, introContent: { introContent } }) => {
  return (
    <StyledBlueBackground>
      <Grid>
        <IntroRow>
          <Col width={[1]} style={{ position: 'relative' }}>
            <IntroSectionTitleWrapper>
              <StyledSectionTitle reverse as="h1">
                {introHeader}
              </StyledSectionTitle>
            </IntroSectionTitleWrapper>
            <ReactMarkdown
              renderers={{
                // eslint-disable-next-line
                heading: props => (
                  <Subtitle noPadding reverse muted {...props} />
                ),
                // eslint-disable-next-line
                list: props => (
                  <StyledCardTitle regular="true" reverse {...props} />
                ),
              }}
              source={introContent}
            />
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
  );
};

export default IntroSection;

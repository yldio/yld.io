import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';
import { Col } from '../grid';
import { Padding, Margin } from 'styled-components-spacing';
import theme from '../../utils/theme';
import { BodyPrimary } from '../Typography';
import darkIcon from '../../images/button-play-dark.svg';
import lightIcon from '../../images/button-play-light.svg';
import ExternalAnchor from '../Common/ExternalAnchor';
import { hexToRgbWithAlpha } from '../../utils/color';

const Wrapper = styled(Col)`
  ${breakpoint('smallTablet')`
    &:nth-child(3) {
        display: none;
    }
  `}

  ${breakpoint('tablet')`
    &:nth-child(3) {
      display: block;
    }
  `}
`;

const PlayIcon = styled.img`
  height: ${theme.spacing[2]};
  width: ${theme.spacing[2]};
  max-height: ${theme.spacing[2]};
  max-width: ${theme.spacing[2]};
`;

const TruncatedParagraph = styled(BodyPrimary)`
  height: ${remcalc(48)};
  overflow: hidden;
  color: ${props => props.color};
  opacity: ${props => props.opacity};

  @supports (-webkit-line-clamp: 2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FlexContent = styled.div`
  display: flex;
`;

const getColorBasedOnBackground = themeVariation => {
  switch (themeVariation) {
    case theme.variations.dark:
      return {
        opacity: 0.5,
        useLightIcon: true,
        color: theme.colors.white,
      };
    case theme.variations.white:
    case theme.variations.grey:
    default:
      return {
        opacity: 1,
        useLightIcon: false,
        color: theme.colors.text,
      };
  }
};

const StandaloneWrapper = styled(Margin)`
  height: ${remcalc(186)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid
    ${({ themeVariation, theme }) =>
      themeVariation === 'dark'
        ? hexToRgbWithAlpha(theme.colors.white, 0.5)
        : hexToRgbWithAlpha(theme.colors.text, 0.25)};
`;

const BaseVideoLink = ({
  children,
  href,
  themeVariation = 'white',
  mode = 'compact',
  ...props
}) => {
  const { opacity, useLightIcon, color } = getColorBasedOnBackground(
    themeVariation,
  );
  const InnerWrapper = mode === 'standalone' ? StandaloneWrapper : 'div';
  const top = { smallPhone: 2, smallTablet: 1.5 };
  const bottom = { smallPhone: 0, smallTablet: 1.5 };

  return (
    <Wrapper width={[1, 1, 1, 1, 6 / 12, 4 / 12]}>
      <ExternalAnchor href={href} color={color} opacity={opacity} {...props}>
        <InnerWrapper
          {...(mode === 'standalone' ? { themeVariation, top, bottom } : {})}
        >
          <Margin vertical={{ smallPhone: 1.5, smallTablet: 0 }}>
            <Padding vertical={1} horizontal={mode === 'standalone' ? 2 : 0}>
              <FlexContent>
                <Margin right={1.5}>
                  <PlayIcon
                    src={useLightIcon ? lightIcon : darkIcon}
                    alt="Play button"
                  />
                </Margin>
                <TruncatedParagraph color={color} opacity={opacity} noPadding>
                  {children}
                </TruncatedParagraph>
              </FlexContent>
            </Padding>
          </Margin>
        </InnerWrapper>
      </ExternalAnchor>
    </Wrapper>
  );
};

export default BaseVideoLink;

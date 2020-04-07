import React, { useContext, useState } from 'react';
import InternalAnchor from '../../Common/InternalAnchor';
import remcalc from 'remcalc';
import styled, { css } from 'styled-components';

import YldLogo from '../../../images/yld-logo.js';
import animatedLogo from '../../../images/logo_animated.gif';
import SquaredLogo from '../../../images/squared-logo.js';
import { HomePageContext } from '../../../context/PageContext';
import { colors, breakpointsWithHeader } from '../../../utils/theme';

const StyledLink = styled(InternalAnchor)`
  width: ${remcalc(48)};

  ${breakpointsWithHeader.header`
    width: ${remcalc(54)};
  `}
`;
const StyledHomePageLink = styled.div`
  cursor: pointer;

  width: ${remcalc(48)};

  ${breakpointsWithHeader.header`
    width: ${remcalc(54)};
  `}
`;

const iconStyles = css`
  width: 48px;
  margin-top: ${remcalc(6)};
`;

const LogoBehavior = ({ children, onMouseEnter, onMouseLeave }) => {
  const isHomePage = useContext(HomePageContext);

  return isHomePage ? (
    <StyledHomePageLink
      onClick={() => window.scrollTo(0, 0)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </StyledHomePageLink>
  ) : (
    <StyledLink
      to="/"
      title="Return to Homepage"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </StyledLink>
  );
};

const LogoLink = ({ squared, fillColorInitial, fillColorHover, textColor }) => {
  const isHomePage = useContext(HomePageContext);

  const [fillColor, setFillColor] = useState(fillColorInitial);
  const onMouseEnter = () => fillColorHover && setFillColor(fillColorHover);
  const onMouseLeave = () => setFillColor(fillColorInitial);

  return (
    <LogoBehavior onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {squared ? (
        <SquaredLogo
          css={iconStyles}
          fillColor={fillColor}
          textColor={textColor}
        />
      ) : isHomePage || fillColorInitial !== colors.text ? (
        // Do not fall back to animated logo if there is a different color,
        // since we cannot recolor that. Also force non-animated on home page.
        <YldLogo css={iconStyles} fillColor={fillColor} />
      ) : (
        <img css={iconStyles} src={animatedLogo} alt="YLD animated logo" />
      )}
    </LogoBehavior>
  );
};

export default LogoLink;

import React, { useContext, useState } from 'react';
import InternalAnchor from '../../Common/InternalAnchor';
import remcalc from 'remcalc';
import styled, { css } from 'styled-components';

import YldLogo from '../../../images/yld-logo.js';
import { HomePageContext } from '../../../context/PageContext';
import { breakpointsWithHeader } from '../../../utils/theme';

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

const LogoLink = ({ fillColorInitial, fillColorHover, textColor }) => {
  const [fillColor, setFillColor] = useState(fillColorInitial);
  const onMouseEnter = () => fillColorHover && setFillColor(fillColorHover);
  const onMouseLeave = () => setFillColor(fillColorInitial);

  return (
    <LogoBehavior onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <YldLogo css={iconStyles} fillColor={fillColor} textColor={textColor} />
    </LogoBehavior>
  );
};

export default LogoLink;

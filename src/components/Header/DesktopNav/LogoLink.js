import React, { useContext, useState } from 'react';
import InternalAnchor from '../../Common/InternalAnchor';
import remcalc from 'remcalc';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import svgLogo from '../../../images/yld-white.svg';
import animatedLogo from '../../../images/logo_animated.gif';
import ServiceSpecialityLogo from '../../../images/service-speciality-logo';
import {
  LogoStyleContext,
  HomePageContext,
} from '../../../context/PageContext';

const StyledLink = styled(InternalAnchor)`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  ${breakpoint('header')`
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  `}
`;
const Logo = styled.img`
  width: 49px;
  height: 36px;
  margin-top: ${remcalc(6)};
`;

const StyledHomePageLink = styled.div`
  cursor: pointer;
`;

const LogoWrapper = ({ children }) => {
  const isHomePage = useContext(HomePageContext);

  return isHomePage ? (
    <StyledHomePageLink onClick={() => window.scrollTo(0, 0)}>
      {children}
    </StyledHomePageLink>
  ) : (
    <InternalAnchor to="/" title="Return to homepage">
      {children}
    </InternalAnchor>
  );
};

const LogoLink = ({
  isServiceOrSpecialityPage = false,
  fillColorInitial = 'black',
  fillColorHover = 'grey',
  textColor = 'black',
}) => {
  const [fillColor, setFillColor] = useState(fillColorInitial);
  const logoStyle = useContext(LogoStyleContext);

  if (logoStyle === 'white') {
    return (
      <LogoWrapper>
        <Logo src={svgLogo} alt="yld logo" />
      </LogoWrapper>
    );
  }

  if (isServiceOrSpecialityPage) {
    return (
      <StyledLink
        to="/"
        title="Return to Homepage"
        onMouseEnter={() => setFillColor(fillColorHover)}
        onMouseLeave={() => setFillColor(fillColorInitial)}
      >
        <ServiceSpecialityLogo fillColor={fillColor} textColor={textColor} />
      </StyledLink>
    );
  }

  return (
    <InternalAnchor to="/" title="Return to Homepage">
      <img role="link" width="49" src={animatedLogo} alt="yld logo" />
    </InternalAnchor>
  );
};

export default LogoLink;

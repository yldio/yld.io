import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col, Grid } from '../grid';
import Hamburger from './MobileNav/Hamburger';
import Overlay from './utils/Overlay';
import Branding from './Branding';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const BaseContainer = styled.div`
  background: ${({ theme, bgColor = 'white' }) =>
    theme.colors[bgColor] || bgColor};
  width: 100%;
  max-width: unset;
`;

const FixedContainer = styled(BaseContainer)`
  position: fixed;
  z-index: ${(props) => props.theme.zIndexes.header};
  box-shadow: ${(props) =>
    props.hasShadow ? `0 9px 9px -9px rgba(0, 0, 0, 0.175)` : null};
`;

// nb: at the moment only the training service has modals pages. Modals match this RegExp:
const trainingModalRegExp = /training\/[a-zA-Z]/;

const getThemeVariation = (bgColor) => {
  const map = {
    dark: ['blueBg'],
    grey: ['grey'],
  };

  return Object.keys(map).find((key) => map[key].includes(bgColor)) || 'white';
};

const StyledTopNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${remcalc(84)};
`;

const Header = ({ slug, path, bgColor, nonFixed, children }) => {
  const [isMobileNavOpen, toggleMobileNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isModalPage = Boolean(path.match(trainingModalRegExp));

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setIsScrolled(document.documentElement.scrollTop !== 0);
  };

  const themeVariation = getThemeVariation(bgColor);
  const Container = nonFixed ? BaseContainer : FixedContainer;

  return isModalPage ? null : (
    <Container bgColor={bgColor} hasShadow={isScrolled}>
      <Grid>
        <Row style={{ overflow: 'visible' }}>
          <Col width={[1]} style={{ overflow: 'visible' }}>
            <StyledTopNavContainer>
              {children ? children : <Branding slug={slug} />}
              {children ? null : (
                <>
                  <DesktopNav path={path} themeVariation={themeVariation} />
                  <Hamburger
                    themeVariation={themeVariation}
                    onClick={() => toggleMobileNav(true)}
                  />
                  <Overlay
                    visible={isMobileNavOpen}
                    onClick={() => toggleMobileNav(false)}
                  />
                  <MobileNav
                    path={path}
                    isOpen={isMobileNavOpen}
                    onClose={() => toggleMobileNav(false)}
                  />
                </>
              )}
            </StyledTopNavContainer>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

Header.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Header;

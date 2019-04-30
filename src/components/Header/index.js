import React, { useState } from 'react'

import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import navLinks from './navLinks'
import { Row, Col, Grid } from '../grid'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNav from './TopNav'
import SideNav from './SideNav'

const StyledPadding = styled(Padding)`
  display: flex;
  height: ${remcalc(120)};
  align-items: center;
`

const StyledGrid = styled(Grid)`
  position: fixed;
  height: ${remcalc(84)};
  background: ${props =>
    props.theme.colors[props.isSpecialityPage ? 'blueBg' : 'white']};
  width: 100%;
  max-width: unset;
  z-index: 100;
  box-shadow: ${props => `0 9px 9px -9px ${props.theme.colors.border}`};

  ${breakpoint('smallTablet')`
    max-width: none;
    margin: 0 auto;
  `}

  ${breakpoint('desktop')`
    right: 50%;
    margin: 0 -50% 0 0;
    display: flex;
    justify-content: center;
  `}
`

const Header = ({ path, blue }) => {
  const [isSideNavOpen, toggleSideNav] = useState(false)
  const isSpecialityPage = path.includes('speciality')

  return (
    <StyledGrid isSpecialityPage={isSpecialityPage}>
      <Row style={{ overflow: 'visible' }}>
        <Col width={[1]} style={{ overflow: 'visible' }}>
          <StyledPadding bottom={3}>
            <Flex alignCenter justifyBetween full as="header">
              <TopNav
                path={path}
                links={navLinks}
                themeVariation={blue ? 'dark' : 'light'}
              />
              <Hamburger
                onClick={() => toggleSideNav(true)}
                themeVariation={blue ? 'dark' : 'light'}
              />
              <Overlay
                visible={isSideNavOpen}
                onClick={() => toggleSideNav(false)}
              />
              <SideNav
                links={navLinks}
                themeVariation="dark"
                isOpen={isSideNavOpen}
                onClose={() => toggleSideNav(false)}
              />
            </Flex>
          </StyledPadding>
        </Col>
      </Row>
    </StyledGrid>
  )
}

Header.defaultProps = {
  location: {
    pathname: ''
  }
}

export default Header

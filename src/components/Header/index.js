import React, { Fragment, useState, useEffect } from 'react'

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
  height: ${remcalc(120)};
`

const StyledGrid = styled(Grid)`
  position: fixed;
  height: ${remcalc(84)};
  background: ${props =>
    props.theme.colors[props.isSpecialityPage ? 'blueBg' : 'white']};
  width: 100%;
  max-width: unset;
  z-index: ${props => props.theme.zIndexes.header};

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

const StyledShadowGradient = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${remcalc(84)};
  height: ${remcalc(9)};
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0));
`

// nb: training/ and training/#node-js for example are navigation pages and still render the header
const trainingModalRegExp = /training\/(node|react|engineering-skills|development-tools)/

const Header = ({ path, blue }) => {
  const [isSideNavOpen, toggleSideNav] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isSpecialityPage = path.includes('speciality')
  const isModalPage = !!path.match(trainingModalRegExp)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () =>
    setIsScrolled(document.documentElement.scrollTop !== 0)

  return (
    <Fragment>
      {!isModalPage ? (
        <StyledGrid isSpecialityPage={isSpecialityPage}>
          {isScrolled ? <StyledShadowGradient /> : null}
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
      ) : null}
    </Fragment>
  )
}

Header.defaultProps = {
  location: {
    pathname: ''
  }
}

export default Header

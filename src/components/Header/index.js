import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'

import navLinks from './navLinks'
import { Row, Col, Grid } from '../grid'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNav from './TopNav'
import SideNav from './SideNav'

const StyledContainer = styled.div`
  position: fixed;
  background: ${props =>
    props.theme.colors[props.isSpecialityPage ? 'blueBg' : 'white']};
  width: 100%;
  max-width: unset;
  z-index: ${props => props.theme.zIndexes.header};
  box-shadow: ${props =>
    props.hasShadow ? `0 9px 9px -9px rgba(0, 0, 0, 0.175)` : null};
`

// nb: at the moment only the training service has modals pages. Modals match this RegExp:
const trainingModalRegExp = /training\/[a-zA-Z]/

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
        <StyledContainer
          isSpecialityPage={isSpecialityPage}
          hasShadow={isScrolled}
        >
          <Grid>
            <Row style={{ overflow: 'visible' }}>
              <Col width={[1]} style={{ overflow: 'visible' }}>
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
              </Col>
            </Row>
          </Grid>
        </StyledContainer>
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

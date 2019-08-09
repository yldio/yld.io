import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import navLinks from './navLinks'
import { Row, Col, Grid } from '../grid'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNav from './TopNav'
import SideNav from './SideNav'

const StyledContainer = styled.div`
  position: absolute;
  background: ${({ theme, bgColor = 'white' }) => theme.colors[bgColor]};
  width: 100%;
  max-width: unset;
  z-index: ${props => props.theme.zIndexes.header};
  box-shadow: ${props =>
    props.hasShadow ? `0 9px 9px -9px rgba(0, 0, 0, 0.175)` : null};
`

// nb: at the moment only the training service has modals pages. Modals match this RegExp:
const trainingModalRegExp = /training\/[a-zA-Z]/

const getThemeVariation = bgColor => {
  const map = {
    dark: ['blueBg'],
    grey: ['grey']
  }

  return Object.keys(map).find(key => map[key].includes(bgColor)) || 'white'
}

const Header = ({ path, bgColor, slug }) => {
  const [isSideNavOpen, toggleSideNav] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isModalPage = !!path.match(trainingModalRegExp)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () =>
    setIsScrolled(document.documentElement.scrollTop !== 0)

  const themeVariation = getThemeVariation(bgColor)

  return (
    <Fragment>
      {!isModalPage ? (
        <StyledContainer bgColor={bgColor} hasShadow={isScrolled}>
          <Grid>
            <Row style={{ overflow: 'visible' }}>
              <Col width={[1]} style={{ overflow: 'visible' }}>
                <TopNav
                  path={path}
                  slug={slug}
                  links={navLinks}
                  themeVariation={themeVariation}
                />
                <Hamburger
                  onClick={() => toggleSideNav(true)}
                  themeVariation={themeVariation}
                />
                <Overlay
                  visible={isSideNavOpen}
                  onClick={() => toggleSideNav(false)}
                />
                <SideNav
                  path={path}
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

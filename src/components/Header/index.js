import React, { useState } from 'react'

import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import remcalc from 'remcalc'

import { Row, Col, Grid } from '../grid'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNav from './TopNav'
import SideNav from './SideNav'

const navLinks = [
  {
    label: 'Services',
    dropdownItems: [
      {
        label: 'Engineering',
        to: '/engineering/'
      },
      {
        label: 'Design',
        to: '/design/'
      },
      {
        label: 'Training',
        to: '/training/'
      }
    ]
  },
  {
    label: 'Our work',
    to: '/our-work/'
  },
  {
    label: 'Blog',
    href: 'https://medium.com/yld-engineering-blog/'
  },
  {
    label: 'About',
    dropdownItems: [
      {
        label: 'Our team',
        to: '/about-us/'
      },
      {
        label: 'Contact',
        to: '/contact/'
      }
    ]
  },
  {
    label: 'Join us',
    to: '/join-us/'
  }
]

const StyledGrid = styled(Grid)`
  position: fixed;
  width: ${remcalc(1100)};
  height: ${remcalc(84)};
  display: flex;
  justify-content: space-between;
  background: white;
  z-index: 100;
`

const Header = ({ path, blue }) => {
  const [isSideNavOpen, toggleSideNav] = useState(false)

  return (
    <StyledGrid>
      <Row style={{ overflow: 'visible' }}>
        <Col width={[1]} style={{ overflow: 'visible' }}>
          <Padding bottom={3}>
            <Flex alignCenter justifyBetween as="header">
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
          </Padding>
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

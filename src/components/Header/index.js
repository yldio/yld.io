import React, { useState } from 'react'

import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import Logo from './Logo'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNav from './TopNav'
import SideNav from './SideNav'

const FixedHeightFlex = styled(Flex)`
  height: 84px;
`

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

const Header = ({ path, blue, logoColour }) => {
  const [isSideNavOpen, toggleSideNav] = useState(false)

  return (
    <Grid>
      <Row style={{ overflow: 'visible' }}>
        <Col width={[1]} style={{ overflow: 'visible' }}>
          <Padding bottom={3}>
            <FixedHeightFlex alignCenter justifyBetween as="header">
              <Logo path={path} blue={blue} logoColour={logoColour} />
              <TopNav
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
            </FixedHeightFlex>
          </Padding>
        </Col>
      </Row>
    </Grid>
  )
}

Header.defaultProps = {
  location: {
    pathname: ''
  }
}

export default Header

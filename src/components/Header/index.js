import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import Logo from './Logo'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'

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
    label: 'Join Us',
    to: '/join-us/'
  }
]

const Header = ({ path, blue, logoColour }) => {
  const [isMobileNavbarOpen, toggleMobileNavbar] = useState(false)

  return (
    <Grid>
      <Row style={{ overflow: 'visible' }}>
        <Col width={[1]} style={{ overflow: 'visible' }}>
          <Padding bottom={3}>
            <FixedHeightFlex alignCenter justifyBetween as="header">
              <Link to="/">
                <Logo path={path} blue={blue} logoColour={logoColour} />
              </Link>
              <TopNavbar links={navLinks} dark={blue} />
              <Hamburger
                light={!!blue}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
              <Overlay
                visible={isMobileNavbarOpen}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
              <SideNavbar
                links={navLinks}
                isOpen={isMobileNavbarOpen}
                onClose={() => toggleMobileNavbar(false)}
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

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

const links = [
  {
    text: 'Engineering',
    path: '/engineering/',
    isInternal: true
  },
  {
    text: 'Design',
    path: '/design/',
    isInternal: true
  },
  {
    text: 'Training',
    path: '/training/',
    isInternal: true
  },
  {
    text: 'Our work',
    path: '/our-work/',
    isInternal: true
  },
  {
    text: 'About us',
    path: '/about-us/',
    isInternal: true
  },
  {
    text: 'Contact',
    path: '/contact/',
    isInternal: true
  },
  {
    text: 'Blog',
    path: 'https://medium.com/yld-engineering-blog/',
    isInternal: false
  },
  {
    text: 'Join Us',
    path: '/join-us/',
    isInternal: true
  }
]

const Header = ({ path, blue, logoColour }) => {
  const [isMobileNavbarOpen, toggleMobileNavbar] = useState(false)

  return (
    <Grid>
      <Row>
        <Col width={[1]}>
          <Padding bottom={3}>
            <FixedHeightFlex alignCenter justifyBetween as="header">
              <Link to="/">
                <Logo path={path} blue={blue} logoColour={logoColour} />
              </Link>
              <TopNavbar links={links} blue={blue} />
              <Hamburger
                light={!!blue}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
              <Overlay
                visible={isMobileNavbarOpen}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
              <SideNavbar
                links={links}
                blue={blue}
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

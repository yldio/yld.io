import React, { useState } from 'react'
import { Link } from 'gatsby'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import remcalc from 'remcalc'

import { Row, Col, Grid } from '../grid'
import Logo from './Logo'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import Navbar from './Navbar'

/* Note: This scale applied to the logo is a temporary solution until the topNav is rebuilt
   according to new design specs. */
const LogoLink = styled(Link)`
  @media (min-width: 901px) and (max-width: 1005px) {
    transform: scale(0.7, 0.7);
    margin-left: -${remcalc(30)};
  }
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
    <Grid as="header">
      <Row>
        <Col width={[1]}>
          <Padding bottom={3}>
            <Flex alignCenter justifyBetween>
              <LogoLink to="/">
                <Logo path={path} blue={blue} logoColour={logoColour} />
              </LogoLink>
              <Navbar
                isOpen={isMobileNavbarOpen}
                onClose={() => toggleMobileNavbar(false)}
                links={links}
                blue={blue}
              />
              <Hamburger
                light={!!blue}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
              <Overlay
                visible={isMobileNavbarOpen}
                onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
              />
            </Flex>
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

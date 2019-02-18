import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { Link } from 'gatsby'
import { Row, Col, Grid } from '../grid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import Logo from './Logo'
import Hamburger from './Hamburger'
import Overlay from './Overlay'
import HeaderAnchor from './HeaderAnchor'
import Navbar from './Navbar'

const HomeLink = styled(HeaderAnchor)`
  display: block;
  padding-right: ${remcalc(30)};

  ${breakpoint('tablet')`
    display: none;
  `};
`

/* Note: This scale applied to the logo is a temporary solution until the topNav is rebuilt
   according to new design specs. */
const LogoLink = styled(Link)`
  @media (min-width: 901px) and (max-width: 1005px) {
    transform: scale(0.7, 0.7);
    margin-left: -${remcalc(30)};
  }
`

const Header = ({ path, blue, logoColour }) => {
  const [isMobileNavbarOpen, toggleMobileNavbar] = useState(false)

  return (
    <Grid>
      <Row>
        <Col width={[1]}>
          <header>
            <Padding top={2} bottom={3}>
              <Flex alignCenter wrap justifyBetween>
                <LogoLink to="/">
                  <Logo path={path} blue={blue} logoColour={logoColour} />
                </LogoLink>
                <Hamburger
                  onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
                />
                <Navbar
                  isOpen={isMobileNavbarOpen}
                  onClose={() => toggleMobileNavbar(false)}
                >
                  <HomeLink activeClassName="active" to="/">
                    Home
                  </HomeLink>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/engineering/"
                  >
                    Engineering
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/design/"
                  >
                    Design
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/training/"
                  >
                    Training
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/our-work/"
                  >
                    Our work
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/contact/"
                  >
                    Contact
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    href="https://medium.com/yld-engineering-blog/"
                  >
                    Blog
                  </HeaderAnchor>
                  <HeaderAnchor
                    light={!!blue}
                    activeClassName="active"
                    to="/join-us/"
                  >
                    Join Us
                  </HeaderAnchor>
                </Navbar>
                <Overlay
                  visible={isMobileNavbarOpen}
                  onClick={() => toggleMobileNavbar(!isMobileNavbarOpen)}
                />
              </Flex>
            </Padding>
          </header>
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

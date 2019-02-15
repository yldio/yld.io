import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { Link } from 'gatsby'
import { Row, Col, Grid } from '../grid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import Logo from './Logo'
import { Hamburger, Overlay } from './elements'
import HeaderAnchor from './HeaderAnchor'
import Navbar from './Navbar'

const HomeLink = styled(HeaderAnchor)`
  display: block;
  padding-right: ${remcalc(30)};

  ${breakpoint('tablet')`
    display: none;
  `};
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
                <Link to="/">
                  <Logo path={path} blue={blue} logoColour={logoColour} />
                </Link>
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
                    reverse
                    activeClassName="active"
                    to="/engineering/"
                  >
                    Engineering
                  </HeaderAnchor>
                  <HeaderAnchor activeClassName="active" to="/design/">
                    Design
                  </HeaderAnchor>
                  <HeaderAnchor activeClassName="active" to="/training/">
                    Training
                  </HeaderAnchor>
                  <HeaderAnchor activeClassName="active" to="/our-work/">
                    Our work
                  </HeaderAnchor>
                  <HeaderAnchor activeClassName="active" to="/contact/">
                    Contact
                  </HeaderAnchor>
                  <HeaderAnchor href="https://medium.com/yld-engineering-blog/">
                    Blog
                  </HeaderAnchor>
                  <HeaderAnchor activeClassName="active" to="/join-us/">
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

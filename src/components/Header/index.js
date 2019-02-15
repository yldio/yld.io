import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from '../grid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import Logo from './Logo'
import menu from '../../images/menu.svg'
import close from '../../images/close.svg'
import { MobileMenu, Close, DesktopMenu, Overlay } from './elements.js'
import MenuItem from './MenuItem'
import HomeLink from './HomeLink'
import HeaderAnchor from './HeaderAnchor'

const Header = ({ path, blue, logoColour }) => {
  const [menuOpen, toggleMenu] = useState(false)

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
                <MobileMenu>
                  <button onClick={() => toggleMenu(!menuOpen)}>
                    <img src={menu} alt="open menu" />
                  </button>
                </MobileMenu>
                <DesktopMenu open={menuOpen}>
                  <Close onClick={() => toggleMenu(!menuOpen)}>
                    <img src={close} alt="Close menu" />
                  </Close>
                  <MenuItem>
                    <HomeLink>
                      <Link activeClassName="active" to="/">
                        Home
                      </Link>
                    </HomeLink>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor
                      reverse
                      activeClassName="active"
                      to="/engineering/"
                    >
                      Engineering
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor activeClassName="active" to="/design/">
                      Design
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor activeClassName="active" to="/training/">
                      Training
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor activeClassName="active" to="/our-work/">
                      Our work
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor activeClassName="active" to="/contact/">
                      Contact
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor href="https://medium.com/yld-engineering-blog/">
                      Blog
                    </HeaderAnchor>
                  </MenuItem>
                  <MenuItem>
                    <HeaderAnchor activeClassName="active" to="/join-us/">
                      Join Us
                    </HeaderAnchor>
                  </MenuItem>
                </DesktopMenu>
                <Overlay
                  visible={menuOpen}
                  onClick={() => toggleMenu(!menuOpen)}
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

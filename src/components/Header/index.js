import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from '../grid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import Logo from './Logo'
import ExternalAnchor from '../Common/ExternalAnchor'
import menu from '../../images/menu.svg'
import close from '../../images/close.svg'
import {
  MobileMenu,
  HomeLink,
  Close,
  DesktopMenu,
  Overlay
} from './elements.js'

class Header extends Component {
  state = { menuOpen: false }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }))

  render() {
    const { path, blue, logoColour } = this.props

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
                    <button onClick={this.toggleMenu}>
                      <img src={menu} alt="open menu" />
                    </button>
                  </MobileMenu>
                  <DesktopMenu open={this.state.menuOpen}>
                    <HomeLink right={30}>
                      <Link activeClassName="active" to="/">
                        Home
                      </Link>
                    </HomeLink>
                    <Link reverse activeClassName="active" to="/engineering/">
                      Engineering
                    </Link>
                    <Link activeClassName="active" to="/design/">
                      Design
                    </Link>
                    <Link activeClassName="active" to="/training/">
                      Training
                    </Link>
                    <Link activeClassName="active" to="/our-work/">
                      Our work
                    </Link>
                    <Link activeClassName="active" to="/contact/">
                      Contact
                    </Link>
                    <ExternalAnchor href="https://medium.com/yld-engineering-blog/">
                      Blog
                    </ExternalAnchor>
                    <Link activeClassName="active" to="/join-us/">
                      Join Us
                    </Link>
                    <Close onClick={this.toggleMenu}>
                      <img src={close} alt="Close menu" />
                    </Close>
                  </DesktopMenu>
                  <Overlay
                    visible={this.state.menuOpen}
                    onClick={this.toggleMenu}
                  />
                </Flex>
              </Padding>
            </header>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Header.defaultProps = {
  location: {
    pathname: ''
  }
}

export default Header

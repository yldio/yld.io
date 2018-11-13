import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import logo from '../../images/logo_animated.gif'
import menu from '../../images/menu.svg'
import close from '../../images/menu_close.svg'
import { MobileMenu, HomeLink, Close, DesktopMenu } from './elements.js'

class Header extends Component {
  state = { menuOpen: false }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }))

  render () {
    return (
      <Grid className="grid">
        <Row>
          <Col xs={12}>
            <header>
              <Padding top={2} bottom={3}>
                <Flex alignCenter wrap justifyBetween>
                  <Link to="/">
                    <img
                      role="button"
                      tab-index="0"
                      height="48"
                      src={logo}
                      alt="yld"
                    />
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
                    <Link activeClassName="active" to="/engineering/">
                      Engineering
                    </Link>
                    <Link activeClassName="active" to="/design/">
                      Design
                    </Link>
                    <Link activeClassName="active" to="/contact/">
                      Contact
                    </Link>
                    <Close onClick={this.toggleMenu}>
                      <img src={close} alt="Close menu" />
                    </Close>
                  </DesktopMenu>
                </Flex>
              </Padding>
            </header>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Header

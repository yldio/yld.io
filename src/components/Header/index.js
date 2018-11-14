import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import logo from '../../images/logo_animated.gif'
import logoEng from '../../images/eng-logo.svg'
import logoDesign from '../../images/design-logo.svg'
import menu from '../../images/menu.svg'
import close from '../../images/menu_close.svg'
import { MobileMenu, HomeLink, Close, DesktopMenu } from './elements.js'

const isClient = () => typeof window !== 'undefined'

const HiddenText = styled.h1`
  position: absolute;
  top: -9999px;
  left: -9999px;
`

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
                    {isClient() &&
                    !window.location.pathname.includes('engineering') &&
                    !window.location.pathname.includes('design') ? (
                        <img
                          role="button"
                          tab-index="0"
                          height="48"
                          src={logo}
                          alt="yld"
                        />
                      ) : null}

                    {isClient() &&
                    window.location.pathname.includes('engineering') ? (
                        <Fragment>
                          <HiddenText>engineering</HiddenText>
                          <img
                            role="button"
                            tab-index="0"
                            height="48"
                            src={logoEng}
                            alt="yld"
                          />
                        </Fragment>
                      ) : null}
                    {isClient() &&
                    window.location.pathname.includes('design') ? (
                        <Fragment>
                          <HiddenText>Design</HiddenText>
                          <img
                            role="button"
                            tab-index="0"
                            height="48"
                            src={logoDesign}
                            alt="yld"
                          />
                        </Fragment>
                      ) : null}
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

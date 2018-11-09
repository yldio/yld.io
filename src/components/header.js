import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import logo from '../images/logo_animated.gif'
import menu from '../images/menu.svg'
import close from '../images/menu_close.svg'

const MobileMenu = styled(Flex)`
  display: flex;
  position: absolute;
  right: ${remcalc(30)};
  cursor: pointer;
  padding: 0;
  margin: 0;

  ${breakpoint('tablet')`
    display: none;
  `};
`

const HomeLink = styled(Padding)`
  display: block;

  ${breakpoint('tablet')`
    display: none;
  `};
`

const Close = styled.button`
  position: absolute;
  top: ${remcalc(18)};
  right: ${remcalc(24)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};
`

const DesktopMenu = styled(Flex)`
  opacity: 0;
  width: 0;
  transform: translateX(100%);
  transition: transform 300ms ease-out;

  ${breakpoint('tablet')`
    display: flex;
    width: auto;
    opacity: 1;
    transform: translateX(0%);
  `};

  ${is('open')`
    width: auto;
    opacity: 1;
    position: fixed;
    background: ${props => props.theme.colors.black};
    display: flex;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    flex-direction: column;
    padding: ${remcalc(24)};
    z-index: 999;
    transform: translateX(0%);
    justify-content: center;

    a {
      opacity: 0.5;
      font-size: ${remcalc(42)};
      font-weight: 500;
      line-height: 1.14;
      margin-bottom: ${remcalc(18)};
      transition: all 200ms ease;
      color: ${props => props.theme.colors.white};
      display: block;
      top: ${remcalc(-60)};

      &:hover, &.active {
        color: ${props => props.theme.colors.white};
        opacity: 1;
      }
    }
  `};
`

class Header extends Component {
  state = { menuOpen: false }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }))

  render () {
    return (
      <Grid className="grid">
        <Row>
          <Col xs={12}>
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
                  <img onClick={this.toggleMenu} src={menu} alt="open menu" />
                </MobileMenu>
                <DesktopMenu open={this.state.menuOpen}>
                  <HomeLink right={30}>
                    <Link activeClassName="active" to="/">
                      Home
                    </Link>
                  </HomeLink>
                  <Padding right={30}>
                    <Link activeClassName="active" to="/engineering/">
                      Engineering
                    </Link>
                  </Padding>
                  <Padding right={30}>
                    <Link activeClassName="active" to="/design/">
                      Design
                    </Link>
                  </Padding>
                  <Link activeClassName="active" to="/contact/">
                    Contact
                  </Link>
                  <Close onClick={this.toggleMenu}>
                    <img src={close} alt="Close menu" />
                  </Close>
                </DesktopMenu>
              </Flex>
            </Padding>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Header

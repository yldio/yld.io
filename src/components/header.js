import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import logo from '../images/yld.svg'
import menu from '../images/menu.svg'

const MobileMenu = styled(Flex)`
  display: flex;

  ${breakpoint('tablet')`
  display: none;
  `};
`

const DesktopMenu = styled(Flex)`
  display: none;

  ${breakpoint('tablet')`
    display: flex;
  `};

  ${is('open')`
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: ${remcalc(24)};

    > div, > a {
      width: 100%;
      text-align: center;
      padding: 0;
      margin-bottom:  ${remcalc(12)};
      font-weight: bold;
    }
  `};
`

class Header extends Component {
  state = { menuOpen: false }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }))

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Padding top={2} bottom={3}>
              <Flex alignCenter wrap justifyBetween>
                <Link to="/">
                  <img role="button" tab-index="0" src={logo} alt="yld" />
                </Link>
                <MobileMenu>
                  <img onClick={this.toggleMenu} src={menu} alt="open menu" />
                </MobileMenu>
                <DesktopMenu open={this.state.menuOpen}>
                  <Padding right={30}>
                    <Link to="/engineering">Engineering</Link>
                  </Padding>
                  <Padding right={30}>
                    <Link to="/design">Design</Link>
                  </Padding>
                  <Link to="/contact">Contact</Link>
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

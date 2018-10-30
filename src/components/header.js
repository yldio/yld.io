import React from 'react'
import { Link } from 'gatsby'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import logo from '../images/yld.svg'

const Header = ({ siteTitle }) => (
  <Padding top={2} bottom={4} horizontal={2}>
    <Flex justifyBetween>
      <Link to="/">
        <img src={logo} alt="yld" />
      </Link>
      <Flex>
        <Padding right={2}>
          <Link to="/engineering">Engineering</Link>
        </Padding>
        <Padding right={2}>
          <Link to="/design">Design</Link>
        </Padding>
        <Link to="/contacts">Contacts</Link>
      </Flex>
    </Flex>
  </Padding>
)

export default Header

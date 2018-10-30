import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/yld.svg'

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem'
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link to="/">
          <img src={logo} alt="yld" />
        </Link>
      </h1>
    </div>
  </div>
)

export default Header

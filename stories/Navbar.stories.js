import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopDropdown from '../src/components/Header/DesktopDropdown'
import HeaderAnchor from '../src/components/Header/HeaderAnchor'
import Navbar from '../src/components/Header/Navbar'

addDecorator(Theme)

storiesOf('Header', module).add('Navbar', () => (
  <Navbar>
    <HeaderAnchor reverse activeClassName="active" to="/engineering/">
      Engineering
    </HeaderAnchor>
    <DesktopDropdown
      items={[
        { href: '/', label: 'home' },
        { href: '/engineering', label: 'engineering' },
        { href: '/engineering', label: 'long long label content' }
      ]}
    >
      Menu
    </DesktopDropdown>
  </Navbar>
))

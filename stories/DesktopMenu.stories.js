import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopDropdown from '../src/components/Header/DesktopDropdown'
import { DesktopMenu } from '../src/components/Header/elements'
import MenuItem from '../src/components/Header/MenuItem'
import HeaderAnchor from '../src/components/Header/HeaderAnchor'

addDecorator(Theme)

storiesOf('Header', module).add('DestkopMenu', () => (
  <DesktopMenu>
    <MenuItem>
      <HeaderAnchor reverse activeClassName="active" to="/engineering/">
        Engineering
      </HeaderAnchor>
    </MenuItem>
    <DesktopDropdown
      items={[
        { href: '/', label: 'home' },
        { href: '/engineering', label: 'engineering' },
        { href: '/engineering', label: 'long long label content' }
      ]}
    >
      Menu
    </DesktopDropdown>
  </DesktopMenu>
))

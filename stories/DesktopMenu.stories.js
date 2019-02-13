import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopMenuDropdown from '../src/components/Header/DesktopMenuDropdown'
import {
  DesktopMenuItem,
  DesktopMenu,
  HeaderAnchor
} from '../src/components/Header/elements'

addDecorator(Theme)

storiesOf('Header', module).add('DestkopMenu', () => (
  <DesktopMenu>
    <DesktopMenuItem>
      <HeaderAnchor reverse activeClassName="active" to="/engineering/">
        Engineering
      </HeaderAnchor>
    </DesktopMenuItem>
    <DesktopMenuDropdown
      items={[
        { href: '/', label: 'home' },
        { href: '/engineering', label: 'engineering' },
        { href: '/engineering', label: 'long long label content' }
      ]}
    >
      Menu
    </DesktopMenuDropdown>
  </DesktopMenu>
))

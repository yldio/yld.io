import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopMenuDropdown from '../src/components/Header/DesktopMenuDropdown'
import { DesktopMenuItem, DesktopMenu } from '../src/components/Header/elements'
import { Link } from 'gatsby'

addDecorator(Theme)

storiesOf('Header', module)
  .add('DestkopMenu', () => (
    <DesktopMenu>
      <DesktopMenuItem>
        <Link reverse activeClassName="active" to="/engineering/">
          Engineering
                      </Link>
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

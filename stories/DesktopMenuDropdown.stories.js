import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { DesktopMenuDropdown } from '../src/components/Header/elements'
import GreyBackground from '../src/components/GreyBG'

addDecorator(Theme)

storiesOf('Header', module).add('DestkopMenu Dropdown', () => (
  <GreyBackground>
    <div
      style={{
        height: '50vh',
        width: '100vw',
        justifyContent: 'center',
        display: 'flex'
      }}
    >
      <ul>
        <DesktopMenuDropdown
          items={[
            { to: '/', label: 'home' },
            { to: 'engineering', label: 'engineering' },
            { to: 'engineering', label: 'long long label content' }
          ]}
        >
          Label
        </DesktopMenuDropdown>
      </ul>
    </div>
  </GreyBackground>
))

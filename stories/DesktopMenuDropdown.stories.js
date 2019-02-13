import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopMenuDropdown from '../src/components/Header/DesktopMenuDropdown'
import GreyBackground from '../src/components/GreyBG'

addDecorator(Theme)

storiesOf('Header', module)
  .add('DestkopMenu Dropdown', () => (
    <GreyBackground>
      <div
        style={{
          height: '50vh',
          width: '100vw',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <ul
          style={{
            width: '100vw',
            boxShadow: '0px 2px 10px -3px rgba(0,0,0,0.75)',
            flexDirection: 'row',
            justifyContent: 'center',
            height: '48px',
            display: 'flex'
          }}
        >
          <DesktopMenuDropdown
            items={[
              { href: '/', label: 'home' },
              { href: '/engineering', label: 'engineering' },
              { href: '/engineering', label: 'long long label content' }
            ]}
          >
            Menu
          </DesktopMenuDropdown>
        </ul>
      </div>
    </GreyBackground>
  ))
  .add('DestkopMenu Dropdown - multiple components', () => (
    <div
      style={{
        height: '50vh',
        width: '100vw',
        justifyContent: 'center',
        display: 'flex'
      }}
    >
      <ul
        style={{
          width: '100vw',
          boxShadow: '0px 2px 10px -3px rgba(0,0,0,0.75)',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '48px',
          display: 'flex'
        }}
      >
        <DesktopMenuDropdown
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' }
          ]}
        >
          Menu 1
        </DesktopMenuDropdown>
        <DesktopMenuDropdown
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' },
            { href: '/engineering', label: 'long long label content' }
          ]}
        >
          Menu 2
        </DesktopMenuDropdown>
      </ul>
    </div>
  ))

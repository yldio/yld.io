import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import DesktopDropdown from '../src/components/Header/DesktopDropdown'

addDecorator(Theme)

storiesOf('Header', module)
  .add('DestkopMenuDropdown', () => (
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
        <DesktopDropdown
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' },
            { href: '/engineering', label: 'long long label content' }
          ]}
        >
          Menu
        </DesktopDropdown>
      </ul>
    </div>
  ))
  .add('DestkopMenuDropdown - dark theme', () => (
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
          background: '#090329',
          height: '48px',
          display: 'flex'
        }}
      >
        <DesktopDropdown
          themeVariation="dark"
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' },
            { href: '/engineering', label: 'long long label content' }
          ]}
        >
          Menu
        </DesktopDropdown>
      </ul>
    </div>
  ))
  .add('DestkopMenuDropdown - multiple components', () => (
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
        <DesktopDropdown
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' }
          ]}
        >
          Menu 1
        </DesktopDropdown>
        <DesktopDropdown
          items={[
            { href: '/', label: 'home' },
            { href: '/engineering', label: 'engineering' },
            { href: '/engineering', label: 'long long label content' }
          ]}
        >
          Menu 2
        </DesktopDropdown>
      </ul>
    </div>
  ))

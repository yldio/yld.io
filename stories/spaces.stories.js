import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import theme from '../src/utils/theme'

addDecorator(Theme)

storiesOf('Spaces', module).add('Spaces', () => (
  <div>
    {theme.space.map((space, idx) =>
      space !== '0' ? (
        <div
          key={idx}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            margin: 10
          }}
        >
          <p
            style={{
              position: 'absolute',
              opacity: 0.5,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 12,
              color: 'red',
              width: '100%',
              textAlign: 'center'
            }}
          >
            Level {idx} - {space.replace('rem', '') * 16}px
          </p>
          <div
            style={{
              width: 160,
              height: space,
              background: '#FFE5E5'
            }}
          />
        </div>
      ) : null
    )}
  </div>
))

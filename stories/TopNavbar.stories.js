import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import TopNavbar from '../src/components/Header/TopNavbar'

addDecorator(Theme)

const links = [
  {
    text: 'Home',
    path: '/',
    isInternal: true
  },
  {
    text: 'Engineering',
    path: '/engineering',
    isInternal: true
  },
  {
    text: 'LinkedIn',
    path: 'https://uk.linkedin.com/',
    isInternal: false
  }
]

storiesOf('Header', module).add('TopNavbar - light theme', () => (
  <TopNavbar links={links} dark={false} />
))

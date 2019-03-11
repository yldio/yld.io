import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import TopNav from '../src/components/Header/TopNav/'

addDecorator(Theme)

const anchors = [
  {
    label: 'Here',
    to: '/'
  },
  {
    label: 'There',
    to: '/there'
  },
  {
    label: 'LinkedIn (external anchor)',
    to: 'https://uk.linkedin.com/'
  }
]

const anchorsAndDropdowns = [
  {
    label: 'First dropdown',
    dropdownItems: [
      {
        label: 'Item 1',
        to: '/item-1/'
      },
      {
        label: 'Item 2',
        to: '/item-2/'
      },
      {
        label: 'Item 3',
        to: '/item-3/'
      }
    ]
  },
  {
    label: 'First anchor',
    to: '/anchor/'
  },
  {
    label: 'LinkedIn (external anchor)',
    href: 'https://uk.linkedin.com/'
  },
  {
    label: 'Second dropdown',
    dropdownItems: [
      {
        label: 'Go here',
        to: '/go-here/'
      },
      {
        label: 'Go there',
        to: '/go-there/'
      }
    ]
  },
  {
    label: 'Last anchor',
    to: '/last-anchor/'
  }
]

storiesOf('Header', module)
  .add('TopNavbar - light theme', () => (
    <TopNav links={anchors} themeVariation="light" />
  ))
  .add('TopNavbar with dropdowns - light theme', () => (
    <TopNav links={anchorsAndDropdowns} themeVariation="light" />
  ))

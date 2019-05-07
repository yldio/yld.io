import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import styled from 'styled-components'

import Theme from './theme'
import TopNav from '../src/components/Header/TopNav/'
import theme from '../src/utils/theme'

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
    label: 'Dropdown 1',
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
    label: 'Anchor 1',
    to: '/anchor/'
  },
  {
    label: 'External anchor',
    href: 'https://uk.linkedin.com/'
  },
  {
    label: 'Dropdown 2',
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
    label: 'Anchor 2',
    to: '/last-anchor/'
  }
]

const DarkThemedHeader = styled.header`
  background: ${theme.colors.blueBg};
  width: 100%;
`

storiesOf('Header', module)
  .add('TopNavbar - light theme', () => (
    <TopNav links={anchors} themeVariation="light" />
  ))
  .add('TopNavbar with dropdowns - light theme', () => (
    <TopNav links={anchorsAndDropdowns} themeVariation="light" />
  ))
  .add('TopNavbar - Service TopNavBar', () => (
    <TopNav links={anchorsAndDropdowns} path="engineering" />
  ))
  .add('TopNavbar - Speciality TopNavBar', () => (
    <DarkThemedHeader>
      <TopNav
        links={anchorsAndDropdowns}
        path="speciality/node-js/"
        themeVariation="dark"
      />
    </DarkThemedHeader>
  ))

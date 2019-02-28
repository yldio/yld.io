import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import TopNavbar from '../src/components/Header/TopNavbar'

addDecorator(Theme)

const anchors = [
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

const anchorsAndDropdowns = [
  {
    text: 'Services',
    dropdownItems: [
      {
        label: 'Engineering',
        to: '/engineering/'
      },
      {
        label: 'Design',
        to: '/design/'
      },
      {
        label: 'Training',
        to: '/training/'
      }
    ]
  },
  {
    text: 'Our work',
    path: '/our-work/',
    isInternal: true
  },
  {
    text: 'Blog',
    path: 'https://medium.com/yld-engineering-blog/',
    isInternal: false
  },
  {
    text: 'About',
    dropdownItems: [
      {
        label: 'Our team',
        to: '/about-us/'
      },
      {
        label: 'Contact',
        to: '/contact/'
      }
    ]
  },
  {
    text: 'Join Us',
    path: '/join-us/',
    isInternal: true
  }
]

storiesOf('Header', module)
  .add('TopNavbar - light theme', () => (
    <TopNavbar links={anchors} dark={false} />
  ))
  .add('TopNavbar with dropdowns - light theme', () => (
    <TopNavbar links={anchorsAndDropdowns} dark={false} />
  ))

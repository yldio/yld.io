import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import Teams from '../src/components/AboutUs/Teams'
import { teams } from './assets/about-us-data.js'

const data = {
  title: 'Our teams',
  teams: teams
}

addDecorator(Theme)

storiesOf('AboutUs', module).add('Teams', () => <Teams {...data} />)

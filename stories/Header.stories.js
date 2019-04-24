import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'

import Header from '../src/components/Header/'

addDecorator(Theme)

storiesOf('Header', module).add('Header itself', () => <Header path="/" />)

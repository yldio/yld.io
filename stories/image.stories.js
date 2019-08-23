import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import Image from '../src/components/Common/Image'
import logo from '../src/images/logo_animated.gif'
import TableComponent from './TableComponent'

addDecorator(Theme)

storiesOf('Image', module).add(
  'with file url',
  () => {
    return <Image image={{ file: { url: logo } }} />
  },
  { props: { TableComponent } }
)

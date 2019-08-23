import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import GetInTouch from '../src/components/Common/GetInTouch'
import TableComponent from './TableComponent'

addDecorator(Theme)

storiesOf('GetInTouch', module).add(
  'GetInTouch',
  () => (
    <GetInTouch
      title="Talk to us about Node.js "
      contactText=" Whether you need help with a project or are interested in training, we love to talk about all things Node."
    />
  ),
  {
    props: { TableComponent }
  }
)

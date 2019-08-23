import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import JobLink from '../src/components/Common/JobLink'
import TableComponent from './TableComponent'

addDecorator(Theme)

storiesOf('JobLink', module).add(
  'JobLink',
  () => {
    return (
      <JobLink
        position="Software Engineer"
        hostedUrl="http://www.lever.com"
        contractType="Permanent"
      />
    )
  },
  { props: { TableComponent } }
)

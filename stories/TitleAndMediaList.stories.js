import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import TitleAndMediaList from '../src/components/Common/TitleAndMediaList'
import TableComponent from './TableComponent'

addDecorator(Theme)

const mediaItems = [
  {
    id: 1,
    title: 'Tutorial name',
    href: 'https://www.google.com',
    body: '3 video tutorials'
  },
  {
    id: 2,
    title: 'Article name',
    href: 'http://nodetuts.com/series',
    body: '2nd Jan 2019'
  },
  {
    id: 3,
    title: 'A third one',
    href: 'http://www.google.com',
    body: 'Ever been to google.com?'
  }
]

storiesOf('Title and Media List', module).add(
  'Title and Media List',
  () => {
    return (
      <TitleAndMediaList
        title="Best title"
        description="Mini description goes here. Mini description goes here. Mini description goes here. Mini description goes here. Mini description goes here."
        mediaItems={mediaItems}
        CTALink="https://yld.io"
        CTAText="Head to yld.io for more"
      />
    )
  },
  { props: { TableComponent } }
)

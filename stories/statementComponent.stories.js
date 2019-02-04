import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import Statement from '../src/components/Common/Statement'

addDecorator(Theme)

const richText = [
  {
    data: { uri: null },
    value:
      'We help our clients move from a culture of delivery to a culture of learning through our expertise in ',
    content: null,
    nodeType: 'text'
  },
  {
    data: { uri: '/engineering' },
    value: null,
    content: [{ value: 'software engineering', nodeType: 'text' }],
    nodeType: 'hyperlink'
  },
  { data: { uri: null }, value: ', ', content: null, nodeType: 'text' },
  {
    data: { uri: '/design' },
    value: null,
    content: [{ value: 'design', nodeType: 'text' }],
    nodeType: 'hyperlink'
  },
  { data: { uri: null }, value: ', ', content: null, nodeType: 'text' },
  {
    data: { uri: '/training' },
    value: null,
    content: [{ value: 'training', nodeType: 'text' }],
    nodeType: 'hyperlink'
  },
  {
    data: { uri: null },
    value: ' and open-source.',
    content: null,
    nodeType: 'text'
  }
]

storiesOf('Statement', module)
  .add('Statement', () => (
    <Statement text="We enable you to adopt emerging technologies and grow powerful engineering teams with a strong focus on open source development." />
  ))
  .add('Statement noPadding', () => (
    <Statement
      noPadding
      text="We enable you to adopt emerging technologies and grow powerful engineering teams with a strong focus on open source development."
    />
  ))
  .add('Statement Rich Text', () => <Statement text={richText} />)

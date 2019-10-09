import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { Grid, Row, Col } from '../src/components/grid'
import {
  H1,
  H2,
  Subtitle,
  Body,
  Code,
  A,
  Blockquote
} from '../src/components/Blog/Typography'

import Theme from './theme'

addDecorator(Theme)

// const getRules = comp => {
//   const rules = comp.componentStyle.rules

//   return rules.reduce((acc, curr) => {
//     if (typeof curr === 'function') {
//       return `${acc}${curr({ theme })}`
//     }

//     return `${acc}${curr}`
//   }, '')
// }

const elements = [
  {
    component: H1,
    label: 'Heading 1',
    colWidths: [1, 1, 1, 10 / 12],
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
  },
  {
    component: H2,
    label: 'Heading 2',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Subtitle,
    label: 'Subtitle',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Body,
    label: 'Body',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Body,
    label: 'Body w/ Code',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor <code>sit amet consectetur adipisicing elit</code>. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Code,
    label: 'Code Block',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      "<code>server.route({    \n  method: 'GET',  \n  path:'/',  \n  handler: function (request, reply) {  \n    var books = [{  \n      title: 'Professional Node.js',  \n      read: false  \n    }, {  \n      title: 'Node.js Patterns',  \n      read: false  \n    }];\n  }\n})</code>"
  },
  {
    component: A,
    label: 'Anchor',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Body,
    label: 'Body with inline Anchor',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit <a href="https://example/com" target="_blank"/>amet consectetur adipisicing</a> elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  },
  {
    component: Blockquote,
    label: 'Blockquote',
    colWidths: [1, 1, 1, 8 / 12],
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ex impedit dicta temporibus animi saepe itaque totam, deserunt consectetur! Facere voluptatem ipsa'
  }
]

storiesOf('Blog Typography', module).add('Typography', () => (
  <Grid style={{ margin: '2rem 0' }}>
    {elements.map(({ component: Component, colWidths, content, label }) => (
      <Row key={content}>
        <Col width={[1]}>
          <p style={{ margin: '2rem 0 0', color: '#757575' }}>{label}</p>
        </Col>
        <Col width={colWidths}>
          <Component dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
      </Row>
    ))}
  </Grid>
))

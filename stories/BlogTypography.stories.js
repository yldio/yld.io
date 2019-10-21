import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import styled from 'styled-components'
import { Grid, Row, Col } from '../src/components/grid'
import {
  H1,
  H2,
  Subtitle,
  Body,
  Code,
  A,
  Blockquote,
  PostWrapper
} from '../src/components/Blog/Typography'

import Theme from './theme'

addDecorator(Theme)

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

const Annotate = styled.h2`
  font-size: 24px;
  font-weight: light;
  margin: 30px 0 20px;
  color: lightgrey;
  text-decoration: underline;
`

storiesOf('Blog Typography', module)
  .add('Base Typography', () => (
    <Grid style={{ margin: '2rem 0' }}>
      {elements.map(({ component: Component, colWidths, content, label }) => (
        <Row key={content}>
          <Col width={[1]}>
            <p style={{ margin: '2rem 0 0', color: '#757575' }}>{label}</p>
          </Col>
          <PostWrapper as={Col} width={colWidths}>
            <Component dangerouslySetInnerHTML={{ __html: content }} />
          </PostWrapper>
        </Row>
      ))}
    </Grid>
  ))
  .add('Compound', () => {
    return (
      <Grid style={{ margin: '2rem 0' }}>
        <Row style={{ justifyContent: 'center' }}>
          <PostWrapper as={Col} width={[8 / 12]}>
            {/* ------------------------------------------------------------ */}
            <Annotate>Body Copy</Annotate>
            <Body>
              Very briefly, logs represent information that can’t be grouped but
              they provide unique details about an event that happened, while
              metrics represent information that can be grouped by events but
              don’t provide unique details.
            </Body>
            <Body>
              Consider that an HTTP request returned a 404 status code. We can
              use a counter metric called clientError, as an example, which will
              continue to increment whenever another 4xx error occurs. Detailed
              information about individual errors can be logged to provide
              additional information for troubleshooting purposes. You can
              correlate them by their timestamp.
            </Body>
            <Body>
              Consider that the above error was caused by the following HTTP/1.1
              request to my-service application:
            </Body>

            {/* ------------------------------------------------------------ */}

            <Annotate>
              Body Copy w/ <strong>H2</strong>
            </Annotate>
            <Body>
              Consider that an HTTP request returned a 404 status code. We can
              use a counter metric called clientError, as an example, which will
              continue to increment whenever another 4xx error occurs. Detailed
              information about individual errors can be logged to provide
              additional information for troubleshooting purposes. You can
              correlate them by their timestamp.
            </Body>
            <H2>What is Suspense?</H2>
            <Body>
              Given the context of this article, it may be tempting to view
              Suspense as a lazy loading mechanism, but this is inaccurate.
              Rather, it provides a means of… well… suspending the rendering of
              an element subtree until a particular operation completes,
              allowing React to render other parts of your app in the meantime;
              a fallback will be shown until said operation is fulfilled.
            </Body>

            {/* ------------------------------------------------------------ */}

            <Annotate>
              Body Copy w/ <strong>Blockquote</strong>
            </Annotate>
            <Body>
              Consider that an HTTP request returned a 404 status code. We can
              use a counter metric called clientError, as an example, which will
              continue to increment whenever another 4xx error occurs. Detailed
              information about individual errors can be logged to provide
              additional information for troubleshooting purposes. You can
              correlate them by their timestamp.
            </Body>

            <Blockquote>
              We <strong>SHOULD</strong> only log information that will help
              identify why a certain event occurs without exposing sensible
              data.
            </Blockquote>
            <Body>
              Given the context of this article, it may be tempting to view
              Suspense as a lazy loading mechanism, but this is inaccurate.
              Rather, it provides a means of… well… suspending the rendering of
              an element subtree until a particular operation completes,
              allowing React to render other parts of your app in the meantime;
              a fallback will be shown until said operation is fulfilled.
            </Body>

            {/* ------------------------------------------------------------ */}

            <Annotate>Blockquote with H2</Annotate>
            <Body>
              Consider that the above error was caused by the following HTTP/1.1
              request to my-service application:
            </Body>

            <Blockquote>
              We <strong>SHOULD</strong> only log information that will help
              identify why a certain event occurs without exposing sensible
              data.
            </Blockquote>

            <H2>Wrap our REST api</H2>

            <Body>
              Given the context of this article, it may be tempting to view
              Suspense as a lazy loading mechanism, but this is inaccurate.
              Rather, it provides a means of… well…{' '}
              <em>suspending the rendering</em> of an element subtree until a
              particular operation completes, allowing React to render other
              parts of your app in the meantime; a fallback will be shown until
              said operation is fulfilled.
            </Body>

            {/* ------------------------------------------------------------ */}

            <Annotate>H2 with Blockquote</Annotate>
            <Body>
              Consider that the above error was caused by the following HTTP/1.1
              request to my-service application:
            </Body>

            <H2>Wrap our REST API</H2>

            <Blockquote>
              We <strong>SHOULD</strong> only log information that will help
              identify why a certain event occurs without exposing sensible
              data.
            </Blockquote>

            <Body>
              Given the context of this article, it may be tempting to view
              Suspense as a lazy loading mechanism, but this is inaccurate.
              Rather, it provides a means of… well… suspending the rendering of
              an element subtree until a particular operation complete
            </Body>
          </PostWrapper>
        </Row>
      </Grid>
    )
  })

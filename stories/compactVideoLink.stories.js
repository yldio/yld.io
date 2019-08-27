import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import CompactVideoLink from '../src/components/Common/CompactVideoLink'
import { Row } from '../src/components/grid'
import BlueBackground from '../src/components/Common/BlueBackground'
import GreyBackground from '../src/components/Common/GreyBackground'

addDecorator(Theme)

const text =
  'Manipulating the Web Audio API with JSX and Custom Renderers - James Wright'
const smallerText = 'Some smaller title'

storiesOf('Compact Video Link', module)
  .add('Single component', () => {
    return (
      <Row>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </CompactVideoLink>
      </Row>
    )
  })
  .add('Multiple components', () => {
    return (
      <Row>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </CompactVideoLink>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {smallerText}
        </CompactVideoLink>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {smallerText}
        </CompactVideoLink>
      </Row>
    )
  })
  .add('Dark theme', () => {
    return (
      <BlueBackground>
        <Row>
          <CompactVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            themeVariation="dark"
          >
            {text}
          </CompactVideoLink>
        </Row>
      </BlueBackground>
    )
  })
  .add('Grey theme', () => {
    return (
      <GreyBackground>
        <Row>
          <CompactVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            themeVariation="grey"
          >
            {text}
          </CompactVideoLink>
        </Row>
      </GreyBackground>
    )
  })

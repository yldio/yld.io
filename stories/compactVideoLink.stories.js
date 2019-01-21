import React, { Fragment } from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'
import CompactVideoLink from '../src/components/Common/CompactVideoLink'
import { Row } from '../src/components/grid'
import BlueBG from '../src/components/BlueBG'
import GreyBG from '../src/components/GreyBG'

const Theme = storyFn => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {storyFn()}
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

addDecorator(Theme)
const text =
  'Manipulating the Web Audio API with JSX and Custom Renderers - James Wright'

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
  .add('Multiple Components component', () => {
    return (
      <Row>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </CompactVideoLink>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </CompactVideoLink>
        <CompactVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </CompactVideoLink>
      </Row>
    )
  })
  .add('Dark bg', () => {
    return (
      <BlueBG>
        <Row>
          <CompactVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            bg="dark"
          >
            {text}
          </CompactVideoLink>
        </Row>
      </BlueBG>
    )
  })
  .add('Grey bg', () => {
    return (
      <GreyBG>
        <Row>
          <CompactVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            bg="grey"
          >
            {text}
          </CompactVideoLink>
        </Row>
      </GreyBG>
    )
  })

import React, { Fragment } from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'
import StandaloneVideoLink from '../src/components/Common/StandaloneVideoLink'
import { Row } from '../src/components/grid'
import BlueBackground from '../src/components/BlueBG'
import GreyBackground from '../src/components/GreyBG'

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
const smallerText = 'Some smaller title'

storiesOf('Standalone Video Link', module)
  .add('Single component', () => {
    return (
      <Row>
        <StandaloneVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </StandaloneVideoLink>
      </Row>
    )
  })
  .add('Multiple components', () => {
    return (
      <Row>
        <StandaloneVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {text}
        </StandaloneVideoLink>
        <StandaloneVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {smallerText}
        </StandaloneVideoLink>
        <StandaloneVideoLink href="https://www.youtube.com/watch?v=IeuuBKBb4Wg">
          {smallerText}
        </StandaloneVideoLink>
      </Row>
    )
  })
  .add('Dark bg', () => {
    return (
      <BlueBackground>
        <Row>
          <StandaloneVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            bg="dark"
          >
            {text}
          </StandaloneVideoLink>
        </Row>
      </BlueBackground>
    )
  })
  .add('Grey bg', () => {
    return (
      <GreyBackground>
        <Row>
          <StandaloneVideoLink
            href="https://www.youtube.com/watch?v=IeuuBKBb4Wg"
            bg="grey"
          >
            {text}
          </StandaloneVideoLink>
        </Row>
      </GreyBackground>
    )
  })

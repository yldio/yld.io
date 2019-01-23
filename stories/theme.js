import { ThemeProvider } from 'styled-components'
import React, { Fragment } from 'react'
import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'

const Theme = storyFn => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {storyFn()}
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

export default Theme

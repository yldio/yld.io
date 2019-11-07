import { ThemeProvider, createGlobalStyle } from 'styled-components'
import React, { Fragment } from 'react'

import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'
const FontsStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700|Roboto+Mono:400');
`

const Theme = storyFn => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {storyFn()}
      <GlobalStyle />
      <FontsStyle />
    </Fragment>
  </ThemeProvider>
)

export default Theme

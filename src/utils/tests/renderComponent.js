import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'

const renderComponent = component =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
// .toJSON()

export default renderComponent

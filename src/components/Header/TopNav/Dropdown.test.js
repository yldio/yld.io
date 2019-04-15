import React from 'react'
import ReactDOM from 'react-dom'
import theme from '../../../utils/theme'
import { ThemeProvider } from 'styled-components'
import Dropdown from './Dropdown'

describe('TopNav Dropdown', () => {
  it('should render a dropdown menu title when passed as child', () => {
    const expectedTitle = 'title'

    const container = document.createElement('div')
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <Dropdown items={[]}>{expectedTitle}</Dropdown>
      </ThemeProvider>,
      container
    )

    expect(container.textContent).toMatch(expectedTitle)
  })
})

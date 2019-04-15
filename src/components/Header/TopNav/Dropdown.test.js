import React from 'react'
import ReactDOM from 'react-dom'
import theme from '../../../utils/theme'
import { ThemeProvider } from 'styled-components'
import Dropdown from './Dropdown'

const items = [
  {
    to: 'YLD Website',
    href: 'https://www.yld.io/',
    label: 'YLD'
  },
  {
    to: 'ReactJS Girls website',
    href: 'https://reactjsgirls.com/',
    label: 'ReactJS Girls'
  }
]

const dropdown = {
  title: 'title',
  labels: items.reduce((str, item) => str + item.label, '')
}

describe('TopNav Dropdown', () => {
  it('should render a dropdown menu title when passed as child', () => {
    const container = document.createElement('div')
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <Dropdown items={[]}>{dropdown.title}</Dropdown>
      </ThemeProvider>,
      container
    )

    expect(container.textContent).toMatch(dropdown.title)
  })

  it('should render all dropdown items labels when passed as children', () => {
    const container = document.createElement('div')
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <Dropdown items={items}>{dropdown.title}</Dropdown>
      </ThemeProvider>,
      container
    )

    expect(container.textContent).toMatch(dropdown.labels)
  })
})

import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import Intro from '../Intro'

describe('Intro', () => {
  const mockSpeciality = {
    title: 'Node.js',
    seoText:
      'Node.js is the fastest growing open source platform in the world. It empowers us to increase our iteration speed and the quality of our work, using a known language that underpins the entire web: JavaScript.',
    introGraphicTitle: 'node',
    introGraphicFile: {},
    introTitle: 'Why use Node.js?',
    introTextTitle1: 'Performance',
    introTextBody1:
      'Node.js allows us to manage high loads, making it perfect for handling peak demand.',
    introTextTitle2: 'Customer experience',
    introTextBody2:
      'With Node.js we can manage very complex API layers and offer a seamless customer experience.',
    introTextTitle3: 'Productivity',
    introTextBody3:
      'Developers love using Node.js and that’s reflected directly in their productivity and job satisfaction.'
  }
  it('renders correctly', () => {
    const tree = renderComponent(<Intro speciality={mockSpeciality} />)

    expect(tree).toMatchSnapshot()
  })
})

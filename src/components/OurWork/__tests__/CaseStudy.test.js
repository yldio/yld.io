import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import { CaseStudy, ServiceList } from '../CaseStudy'
import { caseStudy } from './__fixtures__'

describe('<CaseStudy />', () => {
  it('renders correctly', () => {
    const { container } = render(<CaseStudy caseStudy={caseStudy} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders ServiceList correctly', () => {
    //should create 2 anchors and a text element with separators
    const services = ['Engineering', 'Design', 'Untracked']
    const { container } = render(<ServiceList services={services} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})

import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import { CaseStudy, ServiceList } from '../CaseStudy'

describe('CaseStudy', () => {
  it('renders correctly', () => {
    const caseStudy = {
      title: 'Example Case Study',
      services: ['Engineering', 'Design'],
      posterImage: {
        title: 'example',
        file:
          'https://images.ctfassets.net/22g1lenhck4z/4M3h74EWpWw8AosOCIemoc/e13a13eefedf4ecd5edf26b596d2b3e0/thomas_cook_export.svg'
      },
      slug: 'reinforcing-the-Thomas-Cook-architecture',
      introSentence: 'This is a case-study example'
    }

    const tree = renderComponent(<CaseStudy caseStudy={caseStudy} />)

    expect(tree).toMatchSnapshot()
  })

  it('renders ServiceList correctly', () => {
    //should create 2 anchors and a text element with separators
    const services = ['Engineering', 'Design', 'Untracked']
    const tree = renderComponent(<ServiceList services={services} />)

    expect(tree).toMatchSnapshot()
  })
})

import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import Subsidiaries from '../Subsidiaries'

describe('Subsidiaries', () => {
  it('renders correctly', () => {
    const details = {
      title: 'Subsidiary list',
      subsidiaries: [
        {
          image: {
            file: {
              title: 'subsidiary1',
              url: 'img1.jpg'
            }
          },
          description: 'this is a subsidiary',
          linkUrl: 'https://www.subs1.com',
          linkText: 'Subs1'
        }
      ]
    }
    const tree = renderComponent(<Subsidiaries {...details} />)

    expect(tree).toMatchSnapshot()
  })
})

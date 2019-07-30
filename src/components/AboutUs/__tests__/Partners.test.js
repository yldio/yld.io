import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import Partners from '../Partners'

describe('ClientTestimonial', () => {
  it('renders correctly', () => {
    const title = 'Technology partnerships'
    const partners = [
      {
        id: 0,
        title: 'nodeJS',
        url: 'https://foundation.nodejs.org/',
        image: {
          file: {
            url: 'img1.jpg'
          }
        }
      },
      {
        id: 1,
        title: 'aws',
        url: 'https://aws.amazon.com/pt/',
        image: {
          file: {
            url: 'img2.jpg'
          }
        }
      },
      {
        id: 2,
        title: 'another partner',
        image: {
          file: {
            url: 'img3.jpg'
          }
        }
      }
    ]
    const tree = renderComponent(<Partners title={title} partners={partners} />)

    expect(tree).toMatchSnapshot()
  })
})

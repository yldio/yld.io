import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import ClientTestimonial from '../ClientTestimonial'

describe('ClientTestimonial', () => {
  it('renders correctly', () => {
    const title = 'Testimonial Video Title'
    const video = {
      link: 'https://www.youtube.com/watch?v=Jv5J6a7QJug'
    }
    const tree = renderComponent(
      <ClientTestimonial title={title} video={video} />
    )

    expect(tree).toMatchSnapshot()
  })
})

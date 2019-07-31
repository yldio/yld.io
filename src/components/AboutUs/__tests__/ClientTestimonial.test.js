import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import ClientTestimonial from '../ClientTestimonial'

describe('<ClientTestimonial />', () => {
  it('renders correctly', () => {
    const title = 'Testimonial Video Title'
    const video = {
      link: 'https://www.youtube.com/watch?v=Jv5J6a7QJug'
    }
    const { container } = render(
      <ClientTestimonial title={title} video={video} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})

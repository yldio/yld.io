import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import Partners from '../Partners'
import { partners } from './__fixtures__'

describe('<Partners />', () => {
  it('renders correctly', () => {
    const { title, partnerList } = partners
    const { container } = render(
      <Partners title={title} partners={partnerList} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})

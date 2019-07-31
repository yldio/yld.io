import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import Intro from '../Intro'
import { speciality } from './__fixtures__'

describe('<Intro />', () => {
  it('renders correctly', () => {
    const { container } = render(<Intro speciality={speciality} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})

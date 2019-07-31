import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import StaffCard from '../StaffCard'
import { teamMember } from './__fixtures__'

describe('<StaffCard />', () => {
  it('renders correctly', () => {
    const { container } = render(<StaffCard {...teamMember} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})

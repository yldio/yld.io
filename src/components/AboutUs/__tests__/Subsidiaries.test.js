import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import Subsidiaries from '../Subsidiaries'
import { subsidiaries } from './__fixtures__'

describe('<Subsidiaries />', () => {
  it('renders correctly', () => {
    const { container } = render(<Subsidiaries {...subsidiaries} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})

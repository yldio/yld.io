import React from 'react'
import { render, fireEvent } from '../../../utils/tests/test-utils'
import Teams from '../Teams'
import { teams } from './__fixtures__'

describe('<Teams />', () => {
  test('allows the user to change tabs', async () => {
    const details = {
      title: 'Our teams',
      teams: teams
    }

    const { container, getByTestId, getByText } = render(<Teams {...details} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('staff-card-0')).toHaveTextContent(
      teams[0].members[0].name
    )

    fireEvent.click(getByText('Client'))

    expect(getByTestId('staff-card-0')).toHaveTextContent(
      teams[2].members[0].name
    )
  })
})
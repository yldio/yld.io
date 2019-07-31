import React from 'react'
import { render, fireEvent } from '../../../utils/tests/test-utils'
import Teams from '../Teams'
import { teamMember } from './__fixtures__'

describe('<Teams />', () => {
  test('allows the user to change tabs', async () => {
    const member1 = teamMember

    const member2 = {
      ...member1,
      name: 'Anthony Mann'
    }

    const member3 = {
      ...member1,
      name: 'Julie-Laure Mikulskis'
    }

    const details = {
      title: 'Our teams',
      teams: [
        {
          name: 'Executive',
          members: [member1, member2]
        },
        {
          name: 'Client',
          members: [member3]
        }
      ]
    }

    const { container, getByTestId, getByText } = render(<Teams {...details} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('staff-card-0')).toHaveTextContent(member1.name)

    fireEvent.click(getByText('Client'))

    expect(getByTestId('staff-card-0')).toHaveTextContent(member3.name)
  })
})

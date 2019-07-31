import React from 'react'
import { render } from '../../../utils/tests/test-utils'
import AboutUsHero from '../AboutUsHero'
import { statements } from './__fixtures__'

describe('<AboutUsHero />', () => {
  it('renders correctly', () => {
    const { statementText, supportingStatements } = statements
    const { container } = render(
      <AboutUsHero
        statementText={statementText}
        supportingStatements={supportingStatements}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})

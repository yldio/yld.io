import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import AboutUsHero from '../AboutUsHero'

describe('AboutUsHero', () => {
  it('renders correctly', () => {
    const statementText =
      'We’re a software engineering and design consultancy, helping you succeed by moving your team from a culture of delivery to a culture of learning.'
    const supportingStatements = [
      {
        icon: {
          file: {
            url:
              '//images.ctfassets.net/22g1lenhck4z/3nY47YCXwddZVLJrujz7hR/bf332f4e48512cb3d284e382401d49a3/icon_outperform.svg',
            title: 'Outperform Icon',
            fluid: {}
          }
        },
        text:
          'Offering some of the best engineers and designers in Europe, we augment your talent and deliver solutions so that you out-perform in your market.'
      },
      {
        icon: {
          file: {
            url:
              '//images.ctfassets.net/22g1lenhck4z/2x8pYI2nw4JkmsY28MXyNG/fff47431227f3b10c26645cd2a8aa995/icon_continuous_innovation.svg',
            title: 'Continuous Icon',
            fluid: {}
          }
        },
        text:
          'With newly elevated skills and knowledge, you’re able to continuously innovate long after YLD’s involvement has ended.'
      }
    ]

    const tree = renderComponent(
      <AboutUsHero
        statementText={statementText}
        supportingStatements={supportingStatements}
      />
    )

    expect(tree).toMatchSnapshot()
  })
})

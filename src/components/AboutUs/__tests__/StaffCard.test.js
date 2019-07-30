import React from 'react'
import renderComponent from '../../../utils/tests/renderComponent'
import StaffCard from '../StaffCard'

describe('StaffCard', () => {
  it('renders correctly', () => {
    const details = {
      name: 'Nuno Job',
      image: {
        file: {
          url: 'img1.jpg'
        }
      },
      role: 'Co-founder & Chief Executive Officer - YLD',
      description:
        "Nuno is the Co-founder and CEO of YLD Group. Previously he was the Chief Commercial Officer at Nodejitsu, where he was responsible for the world's largest Node.js cloud, providing extensive contributions to the success of Node.js. Nuno's formative work years were spent in the USA at IBM Research and MarkLogic. He is also a proud Stanford alumni.",
      socialLinks: [
        {
          image: {
            title: 'LinkedIn Icon',
            file: {
              url:
                '//images.ctfassets.net/22g1lenhck4z/3uuYxyNek0bMtaGIwoXFei/586067fb0cf887cbf18bcb12588bda71/linkedin-icon.svg'
            },
            fluid: {}
          },
          name: 'Nuno Job Linkedin',
          url: 'https://www.linkedin.com/in/nunojob/'
        }
      ]
    }
    const tree = renderComponent(<StaffCard {...details} />)

    expect(tree).toMatchSnapshot()
  })
})

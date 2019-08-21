import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { BackgroundGraphic } from '../src/components/Common/BackgroundGraphic'
import BlueBackground from '../src/components/Common/BlueBackground'

addDecorator(Theme)

const image = {
  id: 'bf5e1c23-5a48-5769-a081-4ef1094c06e1',
  title: 'Background graphic',
  file: {
    fileName: 'eng-graphic.svg',
    url:
      '//images.ctfassets.net/22g1lenhck4z/5mJBlVfVuMEGsYsUAgasSa/09eee531f2e46e80cf1a4478fc230c52/eng-graphic.svg'
  }
}

storiesOf('BackgroundGraphic', module).add(
  'BackgroundGraphic',
  () => (
    <BlueBackground style={{ width: '100%' }}>
      <BackgroundGraphic title="How we work" image={image} />
    </BlueBackground>
  ),
  {
    propTables: [
      {
        property: 'title', // The name of the prop
        propType: 'string', // The prop type. TODO: info about what this object is...
        required: true, // True if the prop is required
        description: 'title of the blog', // The description of the prop
        defaultValue: 'none' // The default value of the prop
      }
    ]
  }
)

import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { BackgroundGraphic } from '../src/components/Common/BackgroundGraphic'
import BlueBackground from '../src/components/BlueBG'

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

storiesOf('BackgroundGraphic', module).add('BackgroundGraphic', () => (
  <BlueBackground style={{ width: '100%' }}>
    <BackgroundGraphic title="How we work" image={image} />
  </BlueBackground>
))

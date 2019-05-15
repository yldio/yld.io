import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  AnimatedLink,
  PosterImage,
  CardHeader
} from '../src/components/Common/animatedLink'

addDecorator(Theme)

storiesOf('AnimatedLink', module).add('AnimatedLink', () => (
  <AnimatedLink to="#">
    <section
      style={{
        background: `#03183D`,
        maxWidth: 400
      }}
    >
      <CardHeader>
        <h3 style={{ color: 'white' }}>I am a title</h3>
        <p style={{ color: 'white' }}>This is an intro section</p>
      </CardHeader>
      <PosterImage justifyCenter alignCenter color="03183D">
        <img
          style={{ maxHeight: '100%' }}
          src="https://images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=550&h=550&q=50&fm=webp"
          alt="trainline graphic"
        />
      </PosterImage>
    </section>
  </AnimatedLink>
))

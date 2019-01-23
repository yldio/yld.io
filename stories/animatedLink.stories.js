import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  AnimatedLink,
  PosterImage,
  CardHeader
} from '../src/components/Common/animatedLink'

addDecorator(Theme)

storiesOf('AnimatedLink', module)
  .add('AnimatedLink', () => <AnimatedLink>here</AnimatedLink>)
  .add('PosterImage', () => <PosterImage>here</PosterImage>)
  .add('CardHeader', () => <CardHeader>here</CardHeader>)

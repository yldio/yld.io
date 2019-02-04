import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import CustomisedBulletpoint from '../src/components/CustomisedBulletpoint'

addDecorator(Theme)

storiesOf('CustomisedBulletpoint', module)
  .add('CustomisedBulletpoint', () => (
    <CustomisedBulletpoint>I am a bullet thingy</CustomisedBulletpoint>
  ))
  .add('CustomisedBulletpoint spaced', () => (
    <CustomisedBulletpoint spaced>I am a bullet thingy</CustomisedBulletpoint>
  ))
  .add('CustomisedBulletpoint Symmetrical', () => (
    <CustomisedBulletpoint symmetrical>
      I am a bullet thingy
    </CustomisedBulletpoint>
  ))
  .add('CustomisedBulletpoint fullWidthBorder', () => (
    <CustomisedBulletpoint fullWidthBorder>
      I am a bullet thingy
    </CustomisedBulletpoint>
  ))

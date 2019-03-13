import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import CustomisedBulletpoint from '../src/components/Common/CustomisedBulletpoint'

addDecorator(Theme)

storiesOf('CustomisedBulletpoint', module)
  .add('CustomisedBulletpoint', () => (
    <div>
      <CustomisedBulletpoint>I am a bullet thingy</CustomisedBulletpoint>
    </div>
  ))
  .add('CustomisedBulletpoint with non-default width (500px)', () => (
    <div>
      <CustomisedBulletpoint maxWidth="500px">
        I am a bullet thingy with altered width and really loooooong text inside
      </CustomisedBulletpoint>
    </div>
  ))
  .add('Multiple CustomisedBulletpoints in a ul', () => (
    <ul>
      <CustomisedBulletpoint>First bullet thingy</CustomisedBulletpoint>
      <CustomisedBulletpoint>Second bullet thingy</CustomisedBulletpoint>
      <CustomisedBulletpoint>Third bullet thingy</CustomisedBulletpoint>
    </ul>
  ))

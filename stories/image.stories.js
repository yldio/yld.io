import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import Image from '../src/components/Common/Image';
import logo from '../src/images/logo_animated.gif';

addDecorator(Theme);

storiesOf('Image', module).add('with file url', () => {
  return <Image image={{ file: { url: logo } }} />;
});

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import CookieBanner from '../src/components/Common/CookieBanner';

addDecorator(Theme);

storiesOf('CookieBanner', module).add('CookieBanner', () => <CookieBanner />);

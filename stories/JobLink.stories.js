import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import JobLink from '../src/components/Common/JobLink';

addDecorator(Theme);

storiesOf('JobLink', module).add('JobLink', () => {
  return (
    <JobLink
      position="Software Engineer"
      hostedUrl="https://www.lever.com"
      contractType="Permanent"
    />
  );
});

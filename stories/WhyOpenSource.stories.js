import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import WhyOpenSource from '../src/components/OpenSource/WhyOpenSource';

addDecorator(Theme);

const ExampleImage = {
  title: 'Community Support Logo',
  file: { url: '/community_support.svg' },
  className: 'logo',
};

const ExampleLogo = {
  title: 'Elife logo',
  file: { url: 'elife.png' },
  className: 'client-logo',
};

const clients = [
  ExampleLogo,
  ExampleLogo,
  ExampleLogo,
  ExampleLogo,
  ExampleLogo,
  ExampleLogo,
];

const itemTitle = 'Community support';
const body =
  'Open source technologies are supported by knowledgeable and resourceful communities. Their collective contributions result in more robust, innovative and faster solutions.';

const title = 'Why use Open Source?';
const list = [
  {
    image: ExampleImage,
    itemTitle,
    body,
  },
  {
    image: ExampleImage,
    itemTitle,
    body: 'Using open source technology means transparency and access to the code, which allows faster bug fixes and custom feature development. Clients are no longer dependent on tech vendors and gain full control over the code base.',
  },
  {
    image: ExampleImage,
    itemTitle,
    body,
  },
];
const subtitle = 'Clients we helped with open source';

storiesOf('Why Open Source', module).add('Why Open Source component', () => (
  <WhyOpenSource
    title={title}
    list={list}
    subtitle={subtitle}
    companies={clients}
  />
));

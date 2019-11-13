import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import styled from 'styled-components';
import BlueBackground from '../src/components/Common/BlueBackground';
import { Repo, RepoWithImage } from '../src/components/Common/Repo';

addDecorator(Theme);

const StyledBlueBackground = styled(BlueBackground)`
  padding: 1rem 3rem;
`;

const data = {
  url: 'https://github.com/nodejs/node',
  nameWithOwner: 'nodejs/node',
  pullRequestCount: 123,
  starCount: 123,
};

storiesOf('Repo', module)
  .add('Repo', () => {
    return (
      <div style={{ padding: '1rem 0' }}>
        <Repo {...data} />
      </div>
    );
  })
  .add('Repo Dark', () => {
    return (
      <StyledBlueBackground>
        <div>
          <Repo {...data} theme="dark" />
        </div>
      </StyledBlueBackground>
    );
  })
  .add('Repo w/ Image', () => {
    return (
      <div>
        <RepoWithImage {...data} image={{ file: { url: '/joyent72.svg' } }} />
      </div>
    );
  });

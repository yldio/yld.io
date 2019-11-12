import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import theme from '../src/utils/theme';

addDecorator(Theme);

const colors = Object.keys(theme.colors).map(key => {
  return {
    name: key,
    value: theme.colors[key],
  };
});

storiesOf('Colors', module).add('Colors', () => (
  <div>
    {colors.map(({ value, name }) => (
      <div key={value} style={{ float: 'left', margin: 10 }}>
        <div
          style={{
            border: '1px solid #444',
            width: 160,
            height: 160,
            background: value,
          }}
        />
        <p style={{ color: '#444', fontWeight: 'bold' }}>{name}</p>
        <p>{value}</p>
      </div>
    ))}
  </div>
));

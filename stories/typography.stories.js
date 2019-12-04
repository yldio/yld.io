import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import {
  SectionTitle,
  DisplayTitle,
  CardTitle,
  Subtitle,
  BodyStylised,
  BodyPrimary,
} from '../src/components/Typography';

addDecorator(Theme);

storiesOf('Typography', module)
  .add('SectionTitle', () => <SectionTitle>Section Title</SectionTitle>)
  .add('DisplayTitle', () => <DisplayTitle>Display Title</DisplayTitle>)
  .add('CardTitle', () => (
    <div>
      <CardTitle>Card Title</CardTitle>
      <CardTitle regular>Card Title with regular modifier</CardTitle>
    </div>
  ))
  .add('Subtitle', () => <Subtitle>Subtitle</Subtitle>)
  .add('BodyStylised', () => <BodyStylised>BodyStylised</BodyStylised>)
  .add('BodyPrimary', () => (
    <div>
      <BodyPrimary>BodyPrimary</BodyPrimary>
      <BodyPrimary bold>BodyPrimary with bold modifier</BodyPrimary>
    </div>
  ))
  .add('Typography Modifiers', () => (
    <div>
      <code>secondary</code>
      <DisplayTitle secondary>modifier</DisplayTitle>

      <br />

      <div style={{ background: '#090329' }}>
        <code style={{ color: 'white' }}>reverse</code>
        <DisplayTitle reverse>modifier</DisplayTitle>
      </div>

      <br />

      <code>secondary</code>
      <DisplayTitle secondary>modifier</DisplayTitle>

      <br />

      <code>muted</code>
      <DisplayTitle muted>modifier</DisplayTitle>

      <br />

      <code>noPadding</code>
      <DisplayTitle noPadding>modifier</DisplayTitle>

      <br />

      <code>noPaddingTop</code>
      <DisplayTitle noPaddingTop>modifier</DisplayTitle>

      <br />

      <code>noPaddingBottom</code>
      <DisplayTitle noPaddingBottom>modifier</DisplayTitle>
    </div>
  ));

import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  SectionTitle,
  DisplayTitle,
  CardTitle,
  Subtitle,
  BodyStylised,
  BodyPrimary
} from '../src/components/Typography'

addDecorator(Theme)

storiesOf('Typography', module)
  .add('SectionTitle', () => <SectionTitle>Section Title</SectionTitle>)
  .add('SectionTitle secondary text color', () => (
    <SectionTitle secondary>Section Title secondary text color</SectionTitle>
  ))
  .add('SectionTitle reverse', () => (
    <SectionTitle reverse>Section Title reverse</SectionTitle>
  ))
  .add('SectionTitle textLight', () => (
    <SectionTitle textLight>Section Title textLight</SectionTitle>
  ))
  .add('SectionTitle muted', () => (
    <SectionTitle muted>Section Title muted</SectionTitle>
  ))
  .add('SectionTitle noPadding', () => (
    <SectionTitle noPadding>Section Title without padding</SectionTitle>
  ))

  .add('DisplayTitle', () => <DisplayTitle>Display Title</DisplayTitle>)
  .add('DisplayTitle secondary text color', () => (
    <DisplayTitle secondary>Display Title secondary text color</DisplayTitle>
  ))
  .add('DisplayTitle reverse', () => (
    <DisplayTitle reverse>Display Title reverse</DisplayTitle>
  ))
  .add('DisplayTitle textLight', () => (
    <DisplayTitle textLight>Display Title textLight</DisplayTitle>
  ))
  .add('DisplayTitle muted', () => (
    <DisplayTitle muted>Display Title muted</DisplayTitle>
  ))
  .add('DisplayTitle noPadding', () => (
    <DisplayTitle noPadding>Display Title without padding</DisplayTitle>
  ))

  .add('CardTitle', () => <CardTitle>Display Title</CardTitle>)
  .add('CardTitle secondary text color', () => (
    <CardTitle secondary>Card Title secondary text color</CardTitle>
  ))
  .add('CardTitle reverse', () => (
    <CardTitle reverse>Card Title reverse</CardTitle>
  ))
  .add('CardTitle textLight', () => (
    <CardTitle textLight>Card Title textLight</CardTitle>
  ))
  .add('CardTitle muted', () => <CardTitle muted>Card Title muted</CardTitle>)
  .add('CardTitle noPadding', () => (
    <CardTitle noPadding>Card Title without padding</CardTitle>
  ))

  .add('Subtitle', () => <Subtitle>Subtitle</Subtitle>)
  .add('Subtitle secondary text color', () => (
    <Subtitle secondary>Subtitle secondary text color</Subtitle>
  ))
  .add('Subtitle reverse', () => <Subtitle reverse>Subtitle reverse</Subtitle>)
  .add('Subtitle textLight', () => (
    <Subtitle textLight>Subtitle textLight</Subtitle>
  ))
  .add('Subtitle muted', () => <Subtitle muted>Subtitle muted</Subtitle>)
  .add('Subtitle noPadding', () => (
    <Subtitle noPadding>Subtitle without padding</Subtitle>
  ))

  .add('BodyStylised', () => <BodyStylised>BodyStylised</BodyStylised>)
  .add('BodyStylised secondary text color', () => (
    <BodyStylised secondary>BodyStylised secondary text color</BodyStylised>
  ))
  .add('BodyStylised reverse', () => (
    <BodyStylised reverse>BodyStylised reverse</BodyStylised>
  ))
  .add('BodyStylised textLight', () => (
    <BodyStylised textLight>BodyStylised textLight</BodyStylised>
  ))
  .add('BodyStylised muted', () => (
    <BodyStylised muted>BodyStylised muted</BodyStylised>
  ))
  .add('BodyStylised noPadding', () => (
    <BodyStylised noPadding>BodyStylised without padding</BodyStylised>
  ))

  .add('BodyPrimary', () => <BodyPrimary>BodyPrimary</BodyPrimary>)
  .add('BodyPrimary secondary text color', () => (
    <BodyPrimary secondary>BodyPrimary secondary text color</BodyPrimary>
  ))
  .add('BodyPrimary reverse', () => (
    <BodyPrimary reverse>BodyPrimary reverse</BodyPrimary>
  ))
  .add('BodyPrimary textLight', () => (
    <BodyPrimary textLight>BodyPrimary textLight</BodyPrimary>
  ))
  .add('BodyPrimary muted', () => (
    <BodyPrimary muted>BodyPrimary muted</BodyPrimary>
  ))
  .add('BodyPrimary noPadding', () => (
    <BodyPrimary noPadding>BodyPrimary without padding</BodyPrimary>
  ))

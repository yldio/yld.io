import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  SectionTitle,
  DisplayTitle,
  Subtitle,
  BodyStylised,
  BodyPrimary
} from '../src/components/Typography'

addDecorator(Theme)

storiesOf('Typography', module)
  .add('SectionTitle', () => <SectionTitle>Section Title</SectionTitle>)
  .add('SectionTitle reverse', () => (
    <SectionTitle reverse>Section Title reverse</SectionTitle>
  ))
  .add('SectionTitle muted', () => (
    <SectionTitle muted>Section Title muted</SectionTitle>
  ))
  .add('SectionTitle regular', () => (
    <SectionTitle regular>Section Title regular</SectionTitle>
  ))

  .add('DisplayTitle', () => <DisplayTitle>Section Title</DisplayTitle>)
  .add('DisplayTitle reverse', () => (
    <DisplayTitle reverse>Section Title reverse</DisplayTitle>
  ))
  .add('DisplayTitle muted', () => (
    <DisplayTitle muted>Section Title muted</DisplayTitle>
  ))
  .add('DisplayTitle regular', () => (
    <DisplayTitle regular>Section Title regular</DisplayTitle>
  ))

  .add('Large Body', () => <Subtitle>Large Body</Subtitle>)
  .add('Large Body reverse', () => <Subtitle reverse>Large Body</Subtitle>)
  .add('Large Body regular', () => <Subtitle regular>Large Body</Subtitle>)
  .add('Large Body muted', () => <Subtitle muted>Large Body</Subtitle>)

  .add('Small Title 1', () => <BodyStylised>Small Title</BodyStylised>)
  .add('Small Title 1 reverse', () => (
    <BodyStylised reverse>Small Title</BodyStylised>
  ))
  .add('Small Title 1 muted', () => (
    <BodyStylised muted>Small Title</BodyStylised>
  ))
  .add('Small Title 1 noMargin', () => (
    <BodyStylised noMargin>Small Title</BodyStylised>
  ))

  .add('Small Title 2', () => <BodyPrimary>Small Title</BodyPrimary>)
  .add('Small Title 2 noWrap', () => (
    <BodyPrimary noWrap>Small Title</BodyPrimary>
  ))
  .add('Small Title 2 noMargin', () => (
    <BodyPrimary noMargin>Small Title</BodyPrimary>
  ))
  .add('Small Title 2 reverse', () => (
    <BodyPrimary reverse>Small Title</BodyPrimary>
  ))
  .add('Small Title 2 noTop', () => (
    <BodyPrimary noTop>Small Title</BodyPrimary>
  ))
  .add('Small Title 2 noBottom', () => (
    <BodyPrimary noBottom>Small Title</BodyPrimary>
  ))

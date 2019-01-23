import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  SectionTitleH1,
  SectionTitleH2,
  DisplayTitleH2,
  SubtitleH3,
  BodyStylised,
  BodyPrimary
} from '../src/components/Typography'

addDecorator(Theme)

storiesOf('Typography', module)
  .add('Large title', () => <SectionTitleH1>Large title</SectionTitleH1>)
  .add('Large title reverse', () => (
    <SectionTitleH1 reverse>Large title</SectionTitleH1>
  ))
  .add('Large title muted', () => (
    <SectionTitleH1 muted>Large title</SectionTitleH1>
  ))
  .add('Large title regular', () => (
    <SectionTitleH1 regular>Large title</SectionTitleH1>
  ))
  .add('Large title center', () => (
    <SectionTitleH1 center>Large title</SectionTitleH1>
  ))

  .add('SectionTitleH2', () => <SectionTitleH2>Large title</SectionTitleH2>)

  .add('DisplayTitleH2', () => (
    <DisplayTitleH2 small>Large title</DisplayTitleH2>
  ))

  .add('Large Body', () => <SubtitleH3>Large Body</SubtitleH3>)
  .add('Large Body reverse', () => <SubtitleH3 reverse>Large Body</SubtitleH3>)
  .add('Large Body regular', () => <SubtitleH3 regular>Large Body</SubtitleH3>)
  .add('Large Body muted', () => <SubtitleH3 muted>Large Body</SubtitleH3>)

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

import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph as P
} from '../src/components/Typography'

addDecorator(Theme)

storiesOf('Typography', module)
  .add('Large title', () => <H1>Large title</H1>)
  .add('Large title reverse', () => <H1 reverse>Large title</H1>)
  .add('Large title muted', () => <H1 muted>Large title</H1>)
  .add('Large title regular', () => <H1 regular>Large title</H1>)
  .add('Large title center', () => <H1 center>Large title</H1>)

  .add('H2', () => <H2>Large title</H2>)
  .add('H2 small', () => <H2 small>Large title</H2>)

  .add('Large Body', () => <H3>Large Body</H3>)
  .add('Large Body reverse', () => <H3 reverse>Large Body</H3>)
  .add('Large Body regular', () => <H3 regular>Large Body</H3>)
  .add('Large Body muted', () => <H3 muted>Large Body</H3>)

  .add('Small Title 1', () => <H4>Small Title</H4>)
  .add('Small Title 1 reverse', () => <H4 reverse>Small Title</H4>)
  .add('Small Title 1 muted', () => <H4 muted>Small Title</H4>)
  .add('Small Title 1 noMargin', () => <H4 noMargin>Small Title</H4>)

  .add('Small Title 2', () => <H5>Small Title</H5>)
  .add('Small Title 2 noWrap', () => <H5 noWrap>Small Title</H5>)
  .add('Small Title 2 noMargin', () => <H5 noMargin>Small Title</H5>)
  .add('Small Title 2 reverse', () => <H5 reverse>Small Title</H5>)
  .add('Small Title 2 noTop', () => <H5 noTop>Small Title</H5>)
  .add('Small Title 2 noBottom', () => <H5 noBottom>Small Title</H5>)

  .add('Small Title 3', () => <H6>Small Title</H6>)
  .add('Small Title 3 muted', () => <H6 muted>Small Title</H6>)
  .add('Small Title 3 underline', () => <H6 underline>Small Title</H6>)
  .add('Small Title 3 noMargin', () => <H6 noMargin>Small Title</H6>)
  .add('Small Title 3 reverse', () => <H6 reverse>Small Title</H6>)

  .add('Paragraph', () => <P>Paragraph</P>)
  .add('Paragraph padded', () => <P padded>Paragraph</P>)
  .add('Paragraph secondary', () => <P secondary>Paragraph</P>)
  .add('Paragraph reverse', () => <P reverse>Paragraph</P>)
  .add('Paragraph muted', () => <P muted>Paragraph</P>)
  .add('Paragraph noMargin', () => <P noMargin>Paragraph</P>)
  .add('Paragraph bold', () => <P bold>Paragraph</P>)
  .add('Paragraph fullWidth', () => <P fullWidth>Paragraph</P>)
  .add('Paragraph center', () => <P center>Paragraph</P>)

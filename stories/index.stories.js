import React, { Fragment } from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'

import { H1, H3, H4, H5, H6 } from '../src/components/Typography'
import {
  Checkbox,
  Input,
  Label,
  Button,
  Field,
  Fieldset
} from '../src/components/forms'

const Theme = storyFn => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {storyFn()}
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
)

addDecorator(Theme)

storiesOf('Typography', module)
  .add('Large title', () => <H1>Large title</H1>)
  .add('Large Body', () => <H3>Large Body</H3>)
  .add('Small Title 1', () => <H4>Small Title</H4>)
  .add('Small Title 2', () => <H5>Small Title</H5>)
  .add('Small Title 3', () => <H6>Small Title</H6>)

storiesOf('Form', module)
  .add('Checkbox', () => (
    <Fieldset>
      <Checkbox type="checkbox" id={'checkbox'} name={'checkbox'} />
      <label htmlFor={'checkbox'}>Label</label>
    </Fieldset>
  ))
  .add('Input', () => <Input type="text" placeholder="test" />)
  .add('Button', () => <Button>Click Me</Button>)
  .add('Label', () => <Label>Label</Label>)
  .add('Field', () => (
    <Field>
      <Input type="text" placeholder="test" />
    </Field>
  ))
  .add('Fieldset', () => (
    <Fieldset>
      <Input type="text" placeholder="test" />
    </Fieldset>
  ))

import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  Checkbox,
  Input,
  Label,
  Button,
  Field,
  Fieldset
} from '../src/components/forms'

addDecorator(Theme)

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

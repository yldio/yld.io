import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import {
  Checkbox,
  Input,
  Label,
  Field,
  Fieldset
} from '../src/components/Common/Forms'
import Button from '../src/components/Common/Button'
import TableComponent from './TableComponent'

addDecorator(Theme)

storiesOf('Form', module)
  .add(
    'Checkbox',
    () => (
      <Fieldset>
        <Checkbox type="checkbox" id={'checkbox'} name={'checkbox'} />
        <label htmlFor={'checkbox'}>Label</label>
      </Fieldset>
    ),
    {
      props: { TableComponent }
    }
  )
  .add('Input', () => <Input type="text" placeholder="test" />, {
    props: { TableComponent }
  })
  .add('Button', () => <Button>Click Me</Button>, {
    props: { TableComponent }
  })
  .add('Label', () => <Label>Label</Label>, {
    props: { TableComponent }
  })
  .add(
    'Field',
    () => (
      <Field>
        <Input type="text" placeholder="test" />
      </Field>
    ),
    {
      props: { TableComponent }
    }
  )
  .add(
    'Fieldset',
    () => (
      <Fieldset>
        <Input type="text" placeholder="test" />
      </Fieldset>
    ),
    {
      props: { TableComponent }
    }
  )

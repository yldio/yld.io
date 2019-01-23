import React, { Fragment } from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/utils/theme'
import GlobalStyle from '../src/utils/globalStyle'

import {
  SectionTitleH1,
  CardTitleH3,
  SubtitleH3,
  BodyStylised
} from '../src/components/Typography'
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
  .add('Large title', () => <SectionTitleH1>Large title</SectionTitleH1>)
  .add('Card Title H3', () => <CardTitleH3>Card Title H3</CardTitleH3>)
  .add('Subtitle', () => <SubtitleH3>Subtitle</SubtitleH3>)
  .add('Body Stylised', () => <BodyStylised>Body Stylised</BodyStylised>)

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

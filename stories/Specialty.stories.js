import React, { Component, Fragment } from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'

import { SpecialityView } from '../src/templates/speciality-component'
class StorySpecialityWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(_, info) {
    this.setState({ hasError: true, info })
  }

  render() {
    const { hasError, info } = this.state
    if (hasError) {
      console.log({ info })
      return (
        <Fragment>
          <h1>Something went wrong.</h1>
        </Fragment>
      )
    }
    return this.props.children
  }
}

addDecorator(Theme)

storiesOf('Speciality', module).add('Speciality', () => (
  <StorySpecialityWrapper>
    <SpecialityView />
    {/* <h1>hoo</h1> */}
  </StorySpecialityWrapper>
))

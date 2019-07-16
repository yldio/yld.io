import React, { Component } from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'

import { SpecialityView } from '../src/templates/speciality-component'

const initialRenderingOptions = {
  intro: true,
  projects: true,
  training: true,
  community: true,
  events: true,
  talks: true,
  books: true,
  tutorials: true,
  getintouch: true
}

const ToggleForm = ({ handleToggle, renderOptions }) => (
  <form action="">
    {renderOptions &&
      Object.keys(renderOptions).length &&
      Object.keys(renderOptions).map(option => (
        <div key={option}>
          <label htmlFor={option}>{option}</label>
          <input
            type="checkbox"
            checked={renderOptions[option]}
            onChange={() => handleToggle(option)}
            name={option}
            id={option}
          />
        </div>
      ))}
  </form>
)

const Error = ({ info: { componentStack }, message }) => {
  return (
    <div>
      <h1>Hmm there is an error in the speciality props</h1>
      <pre style={{ color: 'red' }}>{message}</pre>
      <pre>{componentStack}</pre>
    </div>
  )
}

const initialProps = {
  contentfulSpeciality: { foo: 'bar' },
  allContentfulMeetupEvent: { edges: [] }
  // videoIcon:,
  // filteredPosts
}

class StorySpecialityWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      renderOptions: initialRenderingOptions,
      componentProps: initialProps
    }
  }

  componentDidCatch({ message }, info) {
    this.setState({ hasError: true, error: { info, message } })
  }

  handleToggle = option => {
    this.setState(prevState => ({
      ...prevState,
      renderOptions: {
        ...prevState.renderOptions,
        [option]: !prevState.renderOptions[option]
      }
    }))
  }

  render() {
    const { hasError, error, renderOptions, componentProps } = this.state
    const { children } = this.props
    console.log({ componentProps })
    return (
      <div>
        <ToggleForm
          renderOptions={renderOptions}
          handleToggle={this.handleToggle}
        />
        {hasError ? (
          <Error {...error} />
        ) : (
          React.cloneElement(children, { data: componentProps })
        )}
      </div>
    )
  }
}

addDecorator(Theme)

storiesOf('Speciality ', module).add('Speciality', () => (
  <StorySpecialityWrapper>
    <SpecialityView />
  </StorySpecialityWrapper>
))

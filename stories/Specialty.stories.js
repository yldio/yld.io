import React, { Component } from 'react'
import styled from 'styled-components'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'

import { SpecialityView } from '../src/templates/speciality-component'
import data from './assets/speciality-data'

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

const Form = styled.form`
  margin: 0 auto;
  /* transform: scale(5); */
  display: inline-block;
  position: fixed;
  left: 0;
  /* right: 0; */
  box-shadow: 3px 3px 16px 0px;
  padding: 2rem;
  background: white;
`

const ToggleForm = ({ handleToggle, renderOptions }) => (
  <Form>
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
  </Form>
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

class StorySpecialityWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      renderOptions: initialRenderingOptions,
      componentProps: data
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

    return (
      <div style={{ width: '100%' }}>
        <ToggleForm
          renderOptions={renderOptions}
          handleToggle={this.handleToggle}
        />
        {hasError ? (
          <Error {...error} />
        ) : (
          <div>{React.cloneElement(children, { data: componentProps })}</div>
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

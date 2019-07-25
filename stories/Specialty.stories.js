import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import capitalize from 'capitalize'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { Row, Col } from '../src/components/grid'

import { Checkbox } from '../src/components/Common/Forms'
import { SpecialityView } from '../src/templates/speciality-component'
import {
  talkData,
  bookData,
  tutorialData,
  eventsData,
  data
} from './assets/speciality-data'

// ProjectsSection, Community, Talks, BlogListing, Tutorials, Books

const initialRenderingOptions = {
  caseStudies: true,
  clients: true,
  community: true,
  events: true,
  talks: true,
  blogs: true,
  books: true,
  tutorials: true
}

const Form = styled.form`
  margin: 0 auto;
  width: 250px;
  display: inline-block;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  box-shadow: 3px 3px 16px 0px;
  padding: 2rem;
  background: white;
`

const ToggleForm = ({ handleToggle, renderOptions }) => (
  <Form>
    <Row>
      {renderOptions &&
        Object.keys(renderOptions).length &&
        Object.keys(renderOptions).map(option => (
          <Col
            width={[1]}
            key={option}
            block={false}
            style={{ paddingBottom: '1rem' }}
          >
            <Checkbox
              type="checkbox"
              checked={renderOptions[option]}
              onChange={() => handleToggle(option)}
              name={option}
              id={option}
            />
            <label style={{ cursor: 'pointer' }} htmlFor={option}>
              {capitalize(option)}
            </label>
          </Col>
        ))}
    </Row>
  </Form>
)

const ErrorWrapper = styled.div`
  margin: 0 auto;
  width: 500px;
`

const Error = ({ info: { componentStack }, message }) => {
  return (
    <ErrorWrapper>
      <h1>Hmm there is an error in the speciality props</h1>
      <pre style={{ color: 'red' }}>{message}</pre>
      <pre>{componentStack}</pre>
    </ErrorWrapper>
  )
}

class StorySpecialityWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      renderOptions: initialRenderingOptions
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

  generateProps = () => {
    const { renderOptions } = this.state

    const {
      talks,
      books,
      tutorials,
      events,
      community,
      caseStudies,
      clients
    } = renderOptions

    const externalResources = [
      [talks, talkData],
      [books, bookData],
      [tutorials, tutorialData]
    ].reduce((acc, [render, data]) => (render ? acc.concat(data) : acc), [])

    return {
      ...data,
      contentfulSpeciality: {
        ...data.contentfulSpeciality,
        ...(!community && { communityText: [] }),
        relatedProjects: caseStudies
          ? data.contentfulSpeciality.relatedProjects
          : undefined,
        clients: clients ? data.contentfulSpeciality.clients : undefined,
        externalResources
      },
      allContentfulMeetupEvent: {
        edges: events ? eventsData : []
      }
    }
  }

  render() {
    const { hasError, error, renderOptions } = this.state
    const { children } = this.props

    const data = this.generateProps()

    return (
      <Fragment>
        <ToggleForm
          renderOptions={renderOptions}
          handleToggle={this.handleToggle}
        />
        <div
          style={{
            width: '195.312%',
            height: '195.312%',
            transform: 'scale(0.512)',
            transformOrigin: 'top'
          }}
        >
          {hasError ? (
            <Error {...error} />
          ) : (
            React.cloneElement(children, { data })
          )}
        </div>
      </Fragment>
    )
  }
}

addDecorator(Theme)

storiesOf('Speciality ', module).add('Speciality', () => (
  <StorySpecialityWrapper>
    <SpecialityView />
  </StorySpecialityWrapper>
))

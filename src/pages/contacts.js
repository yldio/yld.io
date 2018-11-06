import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import styled from 'styled-components'
import Layout from '../components/layout'
import { H1, Paragraph } from '../components/Typography'
import {
  Checkbox,
  Input,
  Label,
  Textarea,
  Button,
  Fieldset
} from '../components/forms'

const checkboxes = [
  { name: 'join', label: 'Join Our Team' },
  { name: 'training', label: 'Training Services' },
  { name: 'engineering', label: 'Engineering services' },
  { name: 'design', label: 'Design services' },
  { name: 'sponsor', label: 'Sponsor an Event' },
  { name: 'speak', label: 'Speak at an Event' },
  { name: 'issue', label: 'Report an issue' },
  { name: 'none', label: 'None of these' }
]

function encode (data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const GreyOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 70vw;
  background: ${props => props.theme.colors.greyBg};
  z-index: -1;
  left: 0;
  margin-top: 50px;
`

class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false
  }

  handleChangeCheckbox = e => {
    const target = e.target
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.checked
    }))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ submitting: true })

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encode({
        'form-name': 'contact',
        ...this.state
      })
    }).then(() => {
      this.setState({ success: true, submitting: false })
      window.scrollTo(0, 0)
    })
  }

  render () {
    const { name, email, message, submitting, success } = this.state
    return (
      <Layout>
        {success ? (
          <Fragment>
            <Row>
              <Col xs={12} md={7} sm={8}>
                <GreyOverlay />
                <H1>Get in Touch</H1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={7} sm={8}>
                <Paragraph>
                  Thanks for reaching out. We will be in contact shortly
                </Paragraph>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <Fragment>
            <Row>
              <Col xs={12} md={7} sm={8}>
                <GreyOverlay />
                <H1>Get in Touch</H1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={7} sm={8}>
                <Margin top={2}>
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <Label>What are you interested in?</Label>
                    <Fieldset>
                      {checkboxes.map(c => (
                        <section key={c.name}>
                          <Checkbox
                            type="checkbox"
                            id={c.name}
                            name={c.name}
                            onChange={this.handleChangeCheckbox}
                          />
                          <label htmlFor={c.name}>{c.label}</label>
                        </section>
                      ))}
                    </Fieldset>
                    <Label htmlFor="message">Tell us a bit more</Label>
                    <Textarea
                      rows="4"
                      value={message}
                      onChange={this.handleChange}
                      placeholder="A brief description of what you’re looking for"
                      id="message"
                      name="message"
                      required
                    />
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      required
                    />
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Submitting' : 'Submit'}
                    </Button>
                  </form>
                </Margin>
              </Col>
            </Row>
          </Fragment>
        )}
        <Padding bottom={5} />
      </Layout>
    )
  }
}
export default ContactUs

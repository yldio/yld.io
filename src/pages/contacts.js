import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
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
              <Col xs={12} md={6} sm={8}>
                <H1>Get in Touch</H1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} sm={8}>
                <Paragraph>
                  Thanks for reaching out. We will be in contact shortly
                </Paragraph>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <Fragment>
            <Row>
              <Col xs={12} md={6} sm={8}>
                <H1>Get in Touch</H1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} sm={8}>
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
                      placeholder="Mr Fridge Tomatoes"
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
                      placeholder="mrfridgetomatoes@gmail.com"
                      required
                    />
                    <Button type="submit" disabled={submitting}>
                      Submit
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

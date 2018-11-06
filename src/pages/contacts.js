import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
// eslint-disable-next-line
import styled, { withComponent } from 'styled-components'
import Layout from '../components/layout'
import { H1, Paragraph } from '../components/Typography'
import { Margin } from 'styled-components-spacing/dist/cjs/Margin'

const Input = styled.input`
  border: solid 2px ${props => props.theme.colors.text};
  padding: 18px 24px;
  margin-bottom: 36px;
  display: block;
  width: 100%;
  font-size: 18px;
`

const Checkbox = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: solid 2px ${props => props.theme.colors.text};
  margin-right: 12px;
  position: relative;

  &:checked:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${props => props.theme.colors.text};
    width: 12px;
    height: 12px;
    transform: translateX(-50%) translateY(-50%);
  }
`

const Label = styled('label')`
  font-weight: bold;
  padding-bottom: 12px;
  display: block;
`

const Textarea = Input.withComponent('textarea')

const Button = styled.button`
  border: 0;
  display: block;
  padding: 18px 24px;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: 18px;

  :disabled {
    opacity: 0.5;
  }
`

const Fieldset = styled.section`
  display: grid;
  margin-bottom: 36px;
  grid-template-columns: 1fr 1fr;

  > section {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
  }
`

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

    // eslint-disable-next-line
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
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="join"
                          name="join"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="join">Join Our Team</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="training"
                          name="training"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="training">Training Services</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="engineering"
                          name="engineering"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="engineering">
                          Engineering services
                        </label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="design"
                          name="design"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="design">Design services</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="sponsor"
                          name="sponsor"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="sponsor">Sponsor an Event</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="speak"
                          name="speak"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="speak">Speak at an Event</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="issue"
                          name="issue"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="issue">Report an issue</label>
                      </section>
                      <section>
                        <Checkbox
                          type="checkbox"
                          id="none"
                          name="none"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label htmlFor="none">None of these</label>
                      </section>
                    </Fieldset>
                    <Label htmlFor="message">Tell us a bit more</Label>
                    <Textarea
                      rows="4"
                      value={message}
                      onChange={this.handleChange}
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

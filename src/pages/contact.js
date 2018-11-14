import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { StaticQuery, graphql } from 'gatsby'
import { Padding, Margin } from 'styled-components-spacing'
import Layout from '../components/layout'
import { H1, Paragraph } from '../components/Typography'
import {
  Checkbox,
  Input,
  Label,
  Textarea,
  Button,
  Fieldset,
  Field
} from '../components/forms'
import GrayBG from '../components/GrayBG'

const checkboxes = [
  { name: 'engineering', label: 'Engineering services' },
  { name: 'design', label: 'Design services' },
  { name: 'training', label: 'Training services' },
  { name: 'join', label: 'Joining our team' },
  { name: 'speak', label: 'Speaking at an event' },
  { name: 'sponsor', label: 'Sponsoring an event' },
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
    const site = this.props.data.site
    const page = this.props.data.allContentfulPage.edges[0].node
    return (
      <Layout>
        <GrayBG>
          <Helmet
            title={`${site.siteMetadata.title}  ${
              page.title ? '- ' + page.title : ''
            } ${page.seoTitle ? '- ' + page.seoTitle : ''} `}
            meta={[{ name: 'description', content: page.seoMetaDescription }]}
          >
            <html lang="en" />
          </Helmet>
          <Grid className="grid">
            {success ? (
              <Fragment>
                <Row>
                  <Col xs={12} md={7} sm={8}>
                    <H1>We will be in touch</H1>
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
                    <H1>Get in touch</H1>
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
                        <Margin bottom={1}>
                          <Label>What are you interested in?</Label>
                        </Margin>
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
                        <Field>
                          <section key="privacy">
                            <Checkbox
                              required
                              type="checkbox"
                              id="privacy"
                              name="privacy"
                              onChange={this.handleChangeCheckbox}
                            />
                            <label htmlFor="privacy">
                              I agree to the terms of YLD’s privacy policy
                            </label>
                          </section>
                        </Field>
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
          </Grid>
        </GrayBG>
      </Layout>
    )
  }
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulPage(filter: { slug: { eq: "contact" } }) {
          edges {
            node {
              slug
              title
              seoTitle
              seoMetaDescription
            }
          }
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact

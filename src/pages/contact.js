import React, { Component } from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Padding, Margin } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import { Checkbox, Input, Label, Field } from '../components/Common/Forms'
import Button from '../components/Common/Button'
import GreyBackground from '../components/GreyBG'

const TitleSection = ({ title }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3, tablet: 4 }}
    >
      <Row>
        <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
          <SectionTitle as="h1">{title}</SectionTitle>
        </Col>
      </Row>
    </Padding>
  </Grid>
)

export const CheckBoxesContainer = styled(Col)`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: ${remcalc(36)};

  /* Since these columns are inside a column,
     we have to reset the padding on the edges */
  > * {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};

    &:nth-child(odd) {
      padding-left: 0;
    }

    &:nth-child(even) {
      padding-right: 0;
    }
  }
`

const checkboxes = [
  { name: 'engineering', label: 'Engineering services' },
  { name: 'design', label: 'Design services' },
  { name: 'training', label: 'Training services' },
  { name: 'join', label: 'Joining our team' },
  { name: 'community', label: 'Community' },
  { name: 'none', label: 'None of these' }
]

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const LinkUnderline = styled(Link)`
  text-decoration: underline;
`

// NOT CHANGED TO HOOKS BECAUSE YOU DONT WIN ANYTHING
class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false,
    triedSubmitting: false
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

  handleButtonClick = () => {
    this.setState({ triedSubmitting: true })
  }

  render() {
    const { name, email, message, submitting, success } = this.state
    const {
      location,
      data: { contentfulPage: page }
    } = this.props
    return (
      <Layout location={location}>
        <Head page={page} />
        <TitleSection
          title={success ? 'We will be in touch' : 'Get in touch'}
        />
        <GreyBackground>
          <Grid>
            <Padding
              top={{ smallPhone: 3, tablet: 4 }}
              bottom={{ smallPhone: 3.5, tablet: 5 }}
            >
              {success ? (
                <Row>
                  <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
                    <BodyPrimary>
                      Thanks for reaching out. We will be in contact shortly
                    </BodyPrimary>
                  </Col>
                </Row>
              ) : (
                <form
                  name="contact"
                  method="post"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                  style={{ width: '100%' }}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <Row>
                    <Col width={[1, 1, 1, 1, 8 / 12, 7 / 12]}>
                      <Margin bottom={1}>
                        <Label>What are you interested in?</Label>
                      </Margin>
                    </Col>
                  </Row>
                  <Row>
                    <CheckBoxesContainer width={[1, 1, 1, 1, 10 / 12, 8 / 12]}>
                      {checkboxes.map(c => (
                        <Col width={[1, 1, 1, 1, 6 / 12]} key={c.name}>
                          <Checkbox
                            type="checkbox"
                            id={c.name}
                            name={c.name}
                            onChange={this.handleChangeCheckbox}
                          />
                          <label htmlFor={c.name}>{c.label}</label>
                        </Col>
                      ))}
                    </CheckBoxesContainer>
                  </Row>
                  <Row>
                    <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
                      <Label htmlFor="message">Tell us a bit more</Label>
                      <Input
                        as="textarea"
                        noBoxShadow={!this.state.triedSubmitting}
                        rows="4"
                        value={message}
                        onChange={this.handleChange}
                        placeholder="A brief description of what you’re looking for"
                        id="message"
                        name="message"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 5 / 12]}>
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
                            {"I agree to the terms of YLD's "}
                            <LinkUnderline to={'/privacy-policy'}>
                              privacy policy
                            </LinkUnderline>
                          </label>
                        </section>
                      </Field>
                      <Button
                        onClick={this.handleButtonClick}
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting' : 'Submit'}
                      </Button>
                    </Col>
                  </Row>
                </form>
              )}
            </Padding>
          </Grid>
        </GreyBackground>
      </Layout>
    )
  }
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulPage(slug: { eq: "contact" }) {
          slug
          title
          seoTitle
          seoMetaDescription
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact

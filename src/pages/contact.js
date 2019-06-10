import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import TitleSection from '../components/ContactUs/TitleSection'
import GreyBackground from '../components/Common/GreyBackground'
import ThankYouMessage from '../components/ContactUs/ThankYouMessage'
import AreasOfInterest from '../components/ContactUs/AreasOfInterest'
import { Checkbox, Input, Label, Field } from '../components/Common/Forms'
import Button from '../components/Common/Button'

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

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
      data: {
        contentfulPage: {
          title,
          slug,
          seoTitle,
          seoMetaDescription,
          titleNotContacted,
          titleContacted,
          labelInterests,
          interests,
          labelYourMessage,
          labelYourName,
          labelYourEmail,
          privacyPolicyText,
          privacyPolicyLinkText,
          statusNotSent,
          statusSent,
          successMessage
        }
      }
    } = this.props

    return (
      <Layout location={location}>
        <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
          style={{ width: '100%' }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <TitleSection title={success ? titleContacted : titleNotContacted} />
          <GreyBackground>
            <Grid>
              <Padding
                top={{ smallPhone: 3, tablet: 4 }}
                bottom={{ smallPhone: 3.5, tablet: 5 }}
              >
                {success ? (
                  <ThankYouMessage message={successMessage} />
                ) : (
                  <Fragment>
                    <AreasOfInterest
                      title={labelInterests}
                      interests={interests}
                      onChange={this.handleChangeCheckbox}
                    />
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
                        <Label htmlFor="message">{labelYourMessage}</Label>
                        <Input
                          as="textarea"
                          noBoxShadow={!this.state.triedSubmitting}
                          rows="4"
                          value={message}
                          onChange={this.handleChange}
                          id="message"
                          name="message"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 5 / 12]}>
                        <Label htmlFor="name">{labelYourName}</Label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={name}
                          onChange={this.handleChange}
                          required
                        />
                        <Label htmlFor="email">{labelYourEmail}</Label>
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
                              {privacyPolicyText}
                              <LinkUnderline
                                to={'/privacy-policy'}
                                title="yld Privacy Policy"
                              >
                                {privacyPolicyLinkText}
                              </LinkUnderline>
                            </label>
                          </section>
                        </Field>
                        <Button
                          onClick={this.handleButtonClick}
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting ? statusSent : statusNotSent}
                        </Button>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </Padding>
            </Grid>
          </GreyBackground>
        </form>
      </Layout>
    )
  }
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulPage(slug: { eq: "contact" }) {
          title
          slug
          seoTitle
          seoMetaDescription
          titleNotContacted
          titleContacted
          labelInterests
          interests {
            label
            name
          }
          labelYourMessage
          labelYourName
          labelYourEmail
          privacyPolicyText
          privacyPolicyLinkText
          statusNotSent
          statusSent
          successMessage
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact
